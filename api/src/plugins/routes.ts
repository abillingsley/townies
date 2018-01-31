"use strict";

import { PluginRegistrationObject } from "hapi";
import APIV1 from "../router/api/v1";

export default [
  {
    register: require("blipp"), // TODO: only load for development?
    options: {},
  } as PluginRegistrationObject<any>,
  new APIV1(),
];
