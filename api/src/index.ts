"use strict";
/* tslint:disable:no-var-requires */
require("module-alias").addAlias("~", __dirname + "/../../");
/* tslint:enable:no-var-requires */

import { App } from "~/config";
import { IDatabase, Identifiers, ILogger } from "~/core";
import Container from "./container";
import { Server } from "./server";

(async (database: IDatabase, server: Server, logger: ILogger) => {
  try {
    logger.info("Initializing API");
    await database.connect();
    await server.start();
    logger.info("API initialized");
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
})(Container.get<IDatabase>(Identifiers.Database),
   new Server({ port: App.port }),
   Container.get<ILogger>(Identifiers.Logger));
