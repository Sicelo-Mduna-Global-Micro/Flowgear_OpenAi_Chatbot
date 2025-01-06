import React from "react";
import { Card } from "react-bootstrap";

interface PromptCardProps {
  image: string;
  text: string;
  onClick: () => void;
}

const PromptCard: React.FunctionComponent<PromptCardProps> = ({
  image,
  text,
  onClick,
}) => {
  return (
    <Card
      className="prompt-card"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <Card.Img
        variant="top"
        className="prompt-image"
        src={image}
        alt={text}
      />
      <Card.Body style={{ padding: "0.5rem" }}>
        <Card.Text className="prompt-text text-center">{text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PromptCard;
