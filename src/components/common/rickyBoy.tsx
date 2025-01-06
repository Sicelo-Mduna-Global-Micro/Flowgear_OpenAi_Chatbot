import { FunctionComponent } from "react";

interface RickyBoyProps {
  title: string;
}

const RickyBoy: FunctionComponent<RickyBoyProps> = (props) => {
  const { title } = props;
  return (
    <div className="no-data-text">
      {title} <br />
      <img
        style={{ marginTop: "1em" }}
        alt={title}
        src="images/ricky-boy.gif"
      />
    </div>
  );
};

export default RickyBoy;
