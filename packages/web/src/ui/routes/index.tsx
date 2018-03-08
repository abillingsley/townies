import * as React from "react";

import { Link, Route } from "react-router-dom";

import { STATUS } from "routePaths";

import { StatusRoute } from "routes/Status";

export function ApplicationIndex() {
  return (
    <div>
      <Link to={STATUS}>Status</Link>

      <Route path={STATUS} component={StatusRoute} />
      { /* additional top level routes should be added here  */ }
    </div>
  );
}
