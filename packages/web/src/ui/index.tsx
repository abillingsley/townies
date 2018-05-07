import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { BrowserRouter as Router } from "react-router-dom";

import { ApplicationIndex } from "routes/index";

const rootDOMElement = document.getElementById("app");

const render = (AppComponent: any) => {
  ReactDOM.render(
      <AppContainer >
        <Router>
          <AppComponent />
        </Router>
      </AppContainer >,
    rootDOMElement,
  );
};

render(ApplicationIndex);

if ((module as any).hot) {
  (module as any).hot.accept("./routes/index", () => {
    const NextApp = require("./routes/index").default; // tslint:disable-line no-var-requires
    render(NextApp);
  });
}
