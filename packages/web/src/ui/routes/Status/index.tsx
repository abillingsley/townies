import * as React from "react";

import { APIHealth, GoogleHealth } from "components/HealthChecks";

export const StatusRoute = () => (
  <div>
    <APIHealth />
    <GoogleHealth />
  </div>
);
