import React from "react";
import ChatWindow from "./flowbotChatWindow";
import InputBox from "./flowbotInputBox";
import BotToolbar from "./flowbotToolbar";
import OpenAIIntegration from "services/flowbotService";
import SuggestedPrompts from "./flowbotSuggestedPrompts";
import Loader from "components/common/loader";

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
  resetting: boolean;
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
    resetting: false,
  };

  typingInterval: NodeJS.Timeout | null = null;
  simulateTypingInterval: NodeJS.Timeout | null = null;

  componentDidUpdate(_, prevState: FlowBotTabState) {
    if (this.state.isBotTyping && !prevState.isBotTyping) {
      this.startTypingIndicator();
    }
  }

  componentWillUnmount() {
    if (this.typingInterval) clearInterval(this.typingInterval);
    if (this.simulateTypingInterval) clearInterval(this.simulateTypingInterval);
  }

  startTypingIndicator = () => {
    const indicatorCycle = [".", "..", "..."];
    let index = 0;

    this.typingInterval = setInterval(() => {
      if (!this.state.isBotTyping) {
        if (this.typingInterval) clearInterval(this.typingInterval);
        this.setState({ typingIndicator: "" });
      } else {
        this.setState({ typingIndicator: indicatorCycle[index] });
        index = (index + 1) % indicatorCycle.length;
      }
    }, 1000);
  };

  handleSendMessage = async () => {
    if (this.state.resetting) return;
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

  simulateTyping = (response: string) => {
    let index = 0;

    this.simulateTypingInterval = setInterval(() => {
      if (index < response.length) {
        this.setState((prevState) => ({
          botTypedMessage: prevState.botTypedMessage + response[index],
        }));
        index++;
      } else {
        if (this.simulateTypingInterval)
          clearInterval(this.simulateTypingInterval);
        this.setState((prevState) => ({
          isBotTyping: false,
          botTypedMessage: "",
          messages: [...prevState.messages, { sender: "bot", text: response }],
        }));
      }
    }, 5);
  };

  handleNewChat = () => {
    this.setState({ resetting: true });

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  handleRefresh = () => {
    this.setState({ resetting: true });

    setTimeout(() => {
      this.setState({ resetting: false });
    }, 3000);
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

  render() {
    const {
      messages,
      userInput,
      isBotTyping,
      typingIndicator,
      botTypedMessage,
      hasStarted,
      resetting,
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
            loader={
              resetting ? <Loader title="Refreshing chat..." /> : undefined
            }
            hasStarted={hasStarted}
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
