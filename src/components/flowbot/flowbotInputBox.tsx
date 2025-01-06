import React from "react";


interface ChatInputProps {
  userInput: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
}

const ChatInput: React.FunctionComponent<ChatInputProps> = ({
  userInput,
  onInputChange,
  onSendMessage,
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSendMessage();
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        className="input-box"
        value={userInput}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Type a message..."
        onKeyPress={handleKeyPress}
        autoFocus
      />
      <button className="send-button" onClick={onSendMessage}>
        Send
      </button>
    </div>
  );
};

export default ChatInput;
