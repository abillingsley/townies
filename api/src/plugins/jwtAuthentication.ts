"use strict";

import { PluginRegistrationObject } from "hapi";

export default [
  {
    register: require("hapi-auth-jwt2"),
    options: {},
  } as PluginRegistrationObject<any>,
];
