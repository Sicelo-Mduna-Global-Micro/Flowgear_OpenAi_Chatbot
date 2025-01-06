import ReactDOM from "react-dom";
import 'flowgear-webapp/dist/css/app.css';
import { Flowgear } from "flowgear-webapp";
import "bootstrap/dist/css/bootstrap.css";
import "./index.scss";
import "./flowgear-bot-ui-styles.scss";
import App from "app";
import { icons } from "./components/common/icons";

const rootElement = document.getElementById("root");

// Initialise Flowgear
Flowgear.Sdk.init();

// Embed icons
icons.embedIcons(document.getElementById("assetEmbed"));

ReactDOM.render(<App />, rootElement);
