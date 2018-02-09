import * as React from "react";
import * as ReactDOM from "react-dom";
import {AppContainer} from "react-hot-loader";

import App from "./components/App";

const rootDOMElement = document.getElementById("app");

const render = (AppComponent: any) => {
  ReactDOM.render(
      <AppContainer >
        <AppComponent />
      </AppContainer >,
    rootDOMElement,
  );
};

render(App);

if ((module as any).hot) {
  (module as any).hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default; // tslint:disable-line no-var-requires
    render(NextApp);
  });
}
