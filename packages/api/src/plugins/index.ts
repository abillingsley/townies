"use strict";

import Documentation from "./documentation";
import HealthCheck from "./healthCheck";
import Log from "./log";

export default HealthCheck.concat(Log)
                          .concat(Documentation);
