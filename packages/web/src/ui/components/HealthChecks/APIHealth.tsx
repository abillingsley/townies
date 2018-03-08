import * as React from "react";

import { HealthChecker } from "./Containers/HealthChecker";
import { StatusPresentation } from "./Presentation/Status";
export class APIHealth extends React.Component {
  public render() {
    return (
      <HealthChecker
        name="API Server"
        url="/health_check"
        component={StatusPresentation}
        />
    );
  }
}
