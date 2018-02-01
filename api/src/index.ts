"use strict";
/* tslint:disable:no-var-requires */
require("module-alias").addAlias("~", __dirname + "/../../");
/* tslint:enable:no-var-requires */

import { App } from "~/config";
import { ILogger } from "~/core";
import { ConsoleLogger } from "~/infrastructure";
import { Server } from "./server";

// TODO: configure with DI
const logger: ILogger = new ConsoleLogger();
const server = new Server({ port: App.port });

(async () => {
  try {
    logger.info("Initializing API");
    await server.start();
    logger.info("API initialized");
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
})();
