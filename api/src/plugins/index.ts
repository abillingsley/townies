"use strict";

import Documentation from "./documentation";
import HealthCheck from "./healthCheck";
import JWTAuthentication from "./jwtAuthentication";
import Log from "./log";

export default HealthCheck.concat(Log)
                          .concat(JWTAuthentication)
                          .concat(Documentation);
