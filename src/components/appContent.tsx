import NavBar from "components/navbar/navBar";
import ThemeContext from "contexts/themeContext";
import navigationContext from "contexts/navigationContext";
import { useContext, useState } from "react";
import FlowbotTab from "./flowbot/flowbotTab";
import McqQuestionsTab from "./mcqQuestions/mcqQuestionsTab";

export interface AppContentProps {}

const AppContent: React.FunctionComponent<AppContentProps> = (props) => {
  const [currentTab, setCurrentTab] = useState("Flowbot");
  const [routeParams, setRouteParams] = useState<{
    [key: string]: number | string;
  }>({});
  const themeClass = useContext(ThemeContext);
  const handleNavChange = (navTarget: string, routeParams?: {}) => {
    setCurrentTab(navTarget);
    setRouteParams(routeParams);
  };

  const displayCurrentPage = () => {
    switch (currentTab) {
      case "Flowbot":
        return <FlowbotTab handleNavigationChange={handleNavChange} />;
      case "McqQuestions":
        return <McqQuestionsTab handleNavigationChange={handleNavChange} />;
      default:
        break;
    }
  };

  return (
    <navigationContext.Provider value={handleNavChange}>
      <div
        className={"app-container " + themeClass}
        style={{ marginLeft: "0px" }}
      >
        <NavBar currentTab={currentTab} />
        {displayCurrentPage()}
      </div>
    </navigationContext.Provider>
  );
};

export default AppContent;
