import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Plotly from "./Plotly";
import Plot3d from "./Plotly3d";
import Test from "./Test";
import Table from "./Table";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<Plot3d />, document.getElementById("root"));
registerServiceWorker();
