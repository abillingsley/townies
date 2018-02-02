"use strict";

import { PluginRegistrationObject } from "hapi";
import { App } from "~/config";
import { IDatabase, Identifiers } from "~/core";
import Container from "../container";

type MaybeError = Error | null;
type HealthCheckCallback = (err: MaybeError, message: string) => void;

export default [
  {
    register: require("hapi-and-healthy"),
    options: {
      env: App.env,
      auth: false,
      path: "/health_check",
      tags: ["api", "management api"],
      test: {
        node: [
          (callback: HealthCheckCallback) => {
            return Container.get<IDatabase>(Identifiers.Database)
                    .healthcheck()
                    .then(() => callback(null, "database is up"))
                    .catch((err: Error) => callback(err, "database is down"));
          },
        ],
        features: [
          (callback: HealthCheckCallback) => {
            callback(null, "dependency is up");
          },
        ],
      },
    },
  } as PluginRegistrationObject<any>,
];
