"use strict";

import { ISequelizeConfig } from "sequelize-typescript";
import { App, Database } from "~/config";
import { ILogger } from "~/core";
import { ConsoleLogger } from "../logging/consoleLogger";

// TODO: configure with DI
const logger: ILogger = new ConsoleLogger();
const sequelizeConfig: ISequelizeConfig = {
  dialect: "postgres",

  host: Database.host,
  port: Database.port,
  database: Database.database,
  username: Database.username,
  password: Database.password,

  pool: {
    min: Database.pool.min,
    max: Database.pool.max,
    idle: Database.pool.idle,
  },

  logging: (msg: string, timing: number) => logger.info(`${msg} (${timing}ms)`),
  benchmark: !App.isTest,

  define: {
    underscored: true,
    underscoredAll: true,
    paranoid: true,
    timestamps: true,
  },
};

export default sequelizeConfig;
