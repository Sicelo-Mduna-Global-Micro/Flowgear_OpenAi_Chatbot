import React from "react";
import FlowbotToolbar from "./flowbotToolbar";
import FlowbotChatWindow from "./flowbotChatWindow";

interface FlowbotTabProps {
  handleNavigationChange: (navTarget: string, routeParams?: {}) => void;
}

interface FlowbotTabState {}

class FlowbotTab extends React.Component<FlowbotTabProps, FlowbotTabState> {
  state = { messages: null };
  render() {
    return (
      <div className="invoices-due-container">
        <FlowbotToolbar />
        <div
          className="app-contentarea"
          style={{ width: "auto" }}
          id="content-area"
        >
          <div className="container-fluid">
            <div className="invoices-due-container">
              <FlowbotChatWindow />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FlowbotTab;
