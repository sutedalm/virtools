import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import Handsfree from "handsfree";
import "handsfree/build/lib/assets/handsfree.css";

window.handsfree = new Handsfree({
  handpose: true,
  showDebug: true,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
