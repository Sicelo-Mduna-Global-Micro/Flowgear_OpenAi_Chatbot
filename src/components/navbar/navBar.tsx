import navigationContext from "contexts/navigationContext";
import React from "react";
import { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
export interface NavBarProps {
  currentTab: string;
}

const NavBar: React.FunctionComponent<NavBarProps> = (props) => {
  const { currentTab } = props;
  const onNavChange = useContext(navigationContext);
  const navLinks = [
    { path: "Flowbot", title: "Flowbot" },
    { path: "McqQuestions", title: "Flowgear Quiz" },
  ];
  const handleSelect = (key: string) => {
    onNavChange(key);
  };

  const getActiveTab = (tab: string) => {
    switch (tab) {
      case "Flowbot":
        return "Flowbot";
      case "Flowgear Quiz":
        return "Flowgear Quiz";
      default:
        return currentTab;
    }
  };

  return (
    <React.Fragment>
      <div className="container-fluid navbar-container">
        <div className="row">
          <div className="col-9">
            <Navbar>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav
                  className="mr-auto"
                  activeKey={getActiveTab(currentTab)}
                  onSelect={handleSelect}
                >
                  {navLinks.map((navLink, index) => {
                    return (
                      <React.Fragment key={index}>
                        <Nav.Item>
                          <Nav.Link eventKey={navLink.path}>
                            {navLink.title}
                          </Nav.Link>
                        </Nav.Item>
                        {navLinks[index + 1] ? (
                          <Navbar.Text>|</Navbar.Text>
                        ) : (
                          ""
                        )}
                      </React.Fragment>
                    );
                  })}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
