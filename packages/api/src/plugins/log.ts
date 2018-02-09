"use strict";

import { PluginRegistrationObject } from "hapi";
import { Identifiers, ILogger } from "~/core";
import Container from "../container";
import { GoodLogger } from "../services/goodLogger";

export default [
  {
    register: require("good"),
    options: {
      reporters: {
        logger: [(() => new GoodLogger(Container.get<ILogger>(Identifiers.Logger)))()],
      },
    },
  } as PluginRegistrationObject<any>,
];
