"use strict";

import { Config } from "knex";
import { App, Database } from "../../../config";

const knexConfig: Config = {
  client: "pg",
  connection: {
    host: Database.host,
    port: Database.port,
    database: Database.database,
    user: Database.username,
    password: Database.password,
  },
  pool: {
    min: Database.pool.min,
    max: Database.pool.max,
    idleTimeoutMillis: Database.pool.idle,
  },
  migrations: {
    directory: "./migrations",
    tableName: "migrations",
  },
  debug: (App.isDevelopment || App.isTest),
};

module.exports = knexConfig;
export default knexConfig;
