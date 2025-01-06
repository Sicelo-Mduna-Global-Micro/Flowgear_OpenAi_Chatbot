import React from "react";
import ChatWindow from "./flowbotChatWindow";
import InputBox from "./flowbotInputBox";
import BotToolbar from "./flowbotToolbar";
import OpenAIIntegration from "services/flowbotService";
import SuggestedPrompts from "./flowbotSuggestedPrompts";

interface FlowBotTabProps {
  handleNavigationChange: (navTarget: string, routeParams?: {}) => void;
}

interface FlowBotTabState {
  messages: { sender: "user" | "bot" | "default"; text: string }[];
  userInput: string;
  isBotTyping: boolean;
  typingIndicator: string;
  botTypedMessage: string;
  hasStarted: boolean;
}

class FlowBotTab extends React.Component<FlowBotTabProps, FlowBotTabState> {
  state: FlowBotTabState = {
    messages: [
      {
        sender: "default",
        text: "Welcome to Flowgear Assistant! I'm here to help you learn how to use Flowgear. Ask me anything!",
      },
    ],
    userInput: "",
    isBotTyping: false,
    typingIndicator: "",
    botTypedMessage: "",
    hasStarted: false,
  };

  componentDidUpdate(_, prevState: FlowBotTabState) {
    if (this.state.isBotTyping && !prevState.isBotTyping) {
      this.startTypingIndicator();
    }
  }

  startTypingIndicator = () => {
    const indicatorCycle = [".", "..", "..."];
    let index = 0;

    const interval = setInterval(() => {
      if (!this.state.isBotTyping) {
        clearInterval(interval);
        this.setState({ typingIndicator: "" });
      } else {
        this.setState({ typingIndicator: indicatorCycle[index] });
        index = (index + 1) % indicatorCycle.length;
      }
    }, 1000);
  };

  handleSendMessage = async () => {
    const { userInput, messages } = this.state;

    if (!userInput.trim()) return;

    this.setState({
      hasStarted: true,
      messages: messages.filter((msg) => msg.sender !== "default"),
    });

    this.setState((prevState) => ({
      messages: [
        ...prevState.messages,
        { sender: "user", text: userInput.trim() },
      ],
      userInput: "",
    }));

    this.setState({ isBotTyping: true });

    try {
      const botResponse = await OpenAIIntegration.sendMessageToOpenAI({
        chat_input: userInput.trim(),
      });
      this.simulateTyping(botResponse.chat_output);
    } catch {
      this.setState((prevState) => ({
        messages: [
          ...prevState.messages,
          { sender: "bot", text: "Error occurred. Try again!" },
        ],
        isBotTyping: false,
      }));
    }
  };

  handlePromptClick = async (prompt: string) => {
    this.setState((prevState) => ({
      hasStarted: true,
      messages: prevState.messages.filter((msg) => msg.sender !== "default"),
    }));

    this.setState((prevState) => ({
      messages: [...prevState.messages, { sender: "user", text: prompt }],
    }));

    this.setState({ isBotTyping: true });

    try {
      const botResponse = await OpenAIIntegration.sendMessageToOpenAI({
        chat_input: prompt,
      });
      this.simulateTyping(botResponse.chat_output);
    } catch {
      this.setState((prevState) => ({
        messages: [
          ...prevState.messages,
          { sender: "bot", text: "Error occurred. Try again!" },
        ],
        isBotTyping: false,
      }));
    }
  };

  simulateTyping = (response: string) => {
    let index = 0;

    const interval = setInterval(() => {
      if (index < response.length) {
        this.setState((prevState) => ({
          botTypedMessage: prevState.botTypedMessage + response[index],
        }));
        index++;
      } else {
        clearInterval(interval);
        this.setState((prevState) => ({
          isBotTyping: false,
          botTypedMessage: "",
          messages: [...prevState.messages, { sender: "bot", text: response }],
        }));
      }
    }, 50);
  };

  handleNewChat = () => {
    this.setState({
      isBotTyping: false,
      botTypedMessage: "",
      messages: [
        {
          sender: "default",
          text: "Welcome to Flowgear Assistant! I'm here to help you learn how to use Flowgear. Ask me anything!",
        },
      ],
      hasStarted: false,
    });
  };

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    const {
      messages,
      userInput,
      isBotTyping,
      typingIndicator,
      botTypedMessage,
      hasStarted,
    } = this.state;

    return (
      <div className="flowbot-tab">
        <BotToolbar
          onStartNewChat={this.handleNewChat}
          onRefreshChat={this.handleRefresh}
        />
        <div className="chat-container">
          <ChatWindow
            messages={messages}
            isBotTyping={isBotTyping}
            botTypedMessage={botTypedMessage}
            typingIndicator={typingIndicator}
            suggestedPrompts={
              !hasStarted ? (
                <SuggestedPrompts onPromptClick={this.handlePromptClick} />
              ) : null
            }
          />
          <InputBox
            userInput={userInput}
            onInputChange={(value) => this.setState({ userInput: value })}
            onSendMessage={this.handleSendMessage}
          />
        </div>
      </div>
    );
  }
}

export default FlowBotTab;
