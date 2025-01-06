import React from "react";
import { Row, Col } from "react-bootstrap";
import PromptCard from "./flowbotPromptCard"; // Import the new component

interface SuggestedPromptsProps {
  onPromptClick: (prompt: string) => void;
}

const SuggestedPrompts: React.FunctionComponent<SuggestedPromptsProps> = ({
  onPromptClick,
}) => {
  const prompts = [
    { text: "How do I start a workflow?", image: "/images/workflow.png" },
    { text: "What are connectors?", image: "/images/connectors.png" },
    { text: "Tell me about Flowgear pricing.", image: "/images/pricing.png" },
    { text: "What are nodes?", image: "/images/nodes.png" },
    { text: "What is Flowgear?", image: "/images/flowgear.png" },
  ];

  return (
    <div className="suggested-prompts centered-container">
    {prompts.map((prompt, index) => (
      <PromptCard
        key={index}
        image={prompt.image}
        text={prompt.text}
        onClick={() => onPromptClick(prompt.text)}
      />
    ))}
  </div>
  );
};

export default SuggestedPrompts;

