import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Page from "./Page"

import Handsfree from "handsfree";
import "handsfree/build/lib/assets/handsfree.css";

window.handsfree = new Handsfree({
  handpose: true,
  showDebug: false,
});

ReactDOM.render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
  document.getElementById("root")
);
