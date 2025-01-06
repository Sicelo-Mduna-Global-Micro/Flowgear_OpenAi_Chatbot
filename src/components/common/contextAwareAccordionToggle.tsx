import { useContext } from "react";
import { AccordionContext, useAccordionToggle } from "react-bootstrap";

interface ContextAwareAccordionToggleProps {
  eventKey: string;
  callback?: any;
}

const ContextAwareAccordionToggle: React.FunctionComponent<ContextAwareAccordionToggleProps> =
  (props) => {
    const { eventKey, callback } = props;
    const currentEventKey = useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey)
    );

    const isCurrentEventKey = currentEventKey === eventKey;
    return (
      <button
        className="btn btn-default btn-command"
        title="Collapse/Expand"
        style={{
          width: "20px",
          height: "15px",
          marginBottom: "8px",
          marginRight: "10px",
        }}
        onClick={decoratedOnClick}
      >
        {isCurrentEventKey ? (
          <svg style={{ width: "15px", height: "15px" }}>
            <use xlinkHref="#fgicon-plus"></use>
          </svg>
        ) : (
          <svg style={{ width: "15px", height: "15px" }}>
            <use xlinkHref="#fgicon-plus"></use>
          </svg>
        )}
      </button>
    );
  };

export default ContextAwareAccordionToggle;
