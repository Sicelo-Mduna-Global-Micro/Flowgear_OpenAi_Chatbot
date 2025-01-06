import AppContent from "components/appContent";
import ThemeContext from "contexts/themeContext";
import UserContext from "contexts/userContext";
import * as React from "react";
import { userService } from "services/userService";

export interface AppProps {}

export interface AppState {
  themeClass: string;
  loggedInUser: any;
}

class App extends React.Component<AppProps, AppState> {
  state = {
    themeClass: null,
    loggedInUser: null
  };

  async componentDidMount() {
    await this.handleRefresh();
  }

  render() {
    const { themeClass, loggedInUser } = this.state;
    return (
      <ThemeContext.Provider value={themeClass}>
        <UserContext.Provider value={loggedInUser}>
          <AppContent />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }

  async handleRefresh() {
    let themeClass = document.body.classList.contains("theme-dark") ? "theme-dark" : "";
    let user = await userService.getLoggedInUser();

    this.setState({
      themeClass: themeClass,
      loggedInUser: user
    });
  }
}

export default App;
