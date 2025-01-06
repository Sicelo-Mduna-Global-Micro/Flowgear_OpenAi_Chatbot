import React from "react";
import { FunctionComponent } from "react";

interface FlowbotToolbarProps {
  onStartNewChat: () => void;
  onRefreshChat: () => void;
}

const FlowbotToolbar: FunctionComponent<FlowbotToolbarProps> = ({
  onStartNewChat,
  onRefreshChat,
}) => {
  return (
    <React.Fragment>
      <div className="container-fluid toolbar-container">
        <div className="row">
          <div className="col-6" style={{ textAlign: "left" }}>
            <div className="toolbar-title-text">Flowbot</div>
          </div>
          <div className="col-6" style={{ textAlign: "right" }}>
            <button
              className="btn btn-command btn-command-text btn-command-emphasis m-2"
              type="button"
              onClick={onStartNewChat} // Wire up the New Chat button
            >
              <svg>
                <use xlinkHref="#fgicon-plus"></use>
              </svg>{" "}
              New Chat
            </button>
            <button
              className="btn btn-default btn-command m-2"
              title="Refresh Chat"
              onClick={onRefreshChat} // Wire up the Refresh button
            >
              <svg>
                <use xlinkHref="#fgicon-sync"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FlowbotToolbar;
