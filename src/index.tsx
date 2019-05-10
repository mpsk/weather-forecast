import React from "react";
import ReactDOM from "react-dom";
import { isDevMode } from "lib/envs";
import { Application } from "containers/app/Application";

renderApp(Application);

if ((module as any).hot && isDevMode) {
  (module as any).hot.accept("containers/app/Application", () => {
    const NextApp = require("containers/app/Application");
    renderApp(NextApp);
  });
}

function renderApp(AppComponent: React.ComponentClass | React.FunctionComponent) {
  ReactDOM.render(React.createElement(AppComponent), document.getElementById("root"));
}
