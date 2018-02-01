"use strict";

import { PluginRegistrationObject } from "hapi";
import { App } from "~/config";
import { Database } from "~/infrastructure";

type MaybeError = Error | null;
type HealthCheckCallback = (err: MaybeError, message: string) => void;

export default [
  {
    register: require("hapi-and-healthy"),
    options: {
      env: App.env,
      path: "/health_check",
      tags: ["api", "management api"],
      test: {
        node: [
          (callback: HealthCheckCallback) => {
            return Database!.authenticate()
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
