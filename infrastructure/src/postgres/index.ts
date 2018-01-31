"use strict";

import { ILogger } from "~/core";
import { ConsoleLogger } from "../logging/consoleLogger";
import * as Database from "./database";

// TODO: configure with DI
const logger: ILogger = new ConsoleLogger();

(async () => {
  try {
    logger.info("Initializing Database");
    await Database.init();
    logger.info("Database initialized");
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
})();

export { sequelize as Database } from "./database";
export * from "./sequelizeRepository";
