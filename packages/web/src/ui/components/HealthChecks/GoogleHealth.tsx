import * as React from "react";

import { HealthChecker } from "./Containers/HealthChecker";
import { StatusPresentation } from "./Presentation/Status";

export class GoogleHealth extends React.Component {
  public render() {
    return (
      <HealthChecker
        name="Google"
        url="https://google.com"
        component={StatusPresentation}
        />
    );
  }
}
