import React, { createRef } from "react";
import { Container } from "react-bootstrap";
import Markdown from "react-markdown";

interface FlowbotChatWindowProps {
  messages: { sender: "user" | "bot" | "default"; text: string }[];
  isBotTyping: boolean;
  botTypedMessage: string;
  typingIndicator: string;
  suggestedPrompts?: JSX.Element;
  loader?: JSX.Element;
  hasStarted: boolean;
}

class FlowbotChatWindow extends React.Component<FlowbotChatWindowProps> {
  private chatContainerRef = createRef<HTMLDivElement>();
  private endOfMessagesRef = createRef<HTMLDivElement>();

  componentDidUpdate(prevProps: FlowbotChatWindowProps) {
    if (
      prevProps.messages !== this.props.messages ||
      prevProps.isBotTyping !== this.props.isBotTyping
    ) {
      this.scrollToBottom();
    }
  }

  scrollToBottom = () => {
    if (this.endOfMessagesRef.current) {
      this.endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  render() {
    const {
      messages,
      isBotTyping,
      botTypedMessage,
      typingIndicator,
      suggestedPrompts,
      loader,
      hasStarted,
    } = this.props;

    return (
      <div
        className={`chat-window ${hasStarted ? "no-background" : ""}`}
        ref={this.chatContainerRef}
      >
        {loader ? (
          <div className="centered-loader">{loader}</div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message-bubble ${
                  message.sender === "user"
                    ? "user-bubble"
                    : message.sender === "bot"
                    ? "bot-bubble"
                    : "default-bubble"
                }`}
              >
                {message.sender !== "default" && (
                  <div className="avatar-container">
                    <div className="avatar">
                      {message.sender === "user" ? (
                        "Me"
                      ) : (
                        <img
                          src="../../images/FLOWGEAR-LOGO.png"
                          alt="Flowgear Bot"
                          className="avatar-image"
                        />
                      )}
                    </div>
                  </div>
                )}
                <div className="message-text">
                  <Container>
                    <Markdown>{message.text}</Markdown>
                  </Container>
                </div>
              </div>
            ))}
            {isBotTyping && (
              <div className="message-bubble bot-bubble">
                <div className="avatar-container">
                  <div className="avatar">
                    <img
                      src="../../images/FLOWGEAR-LOGO.png"
                      alt="Flowgear Bot"
                      className="avatar-image"
                    />
                  </div>
                </div>
                <div className="message-text">
                  <div className="loader" aria-label="Typing indicator">
                    {typingIndicator}
                  </div>
                </div>
              </div>
            )}
            {suggestedPrompts && (
              <div className="suggested-prompts-container">
                {suggestedPrompts}
              </div>
            )}
          </>
        )}
        <div ref={this.endOfMessagesRef} />
      </div>
    );
  }
}

export default FlowbotChatWindow;
