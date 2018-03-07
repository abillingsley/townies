"use strict";

import { App } from "./app";
import { Secrets } from "./secrets";

export class Database {
  public static readonly host: string = Secrets.DBHost;
  public static readonly port: number = Secrets.DBPort;
  public static readonly database: string = Secrets.DBName;
  public static readonly username: string = Secrets.DBUser;
  public static readonly password: string = Secrets.DBPass;
  public static readonly pool = {
    min: App.isTest ? 0 : 1,
    max: 10,
    idle: App.isTest ? 1000 : undefined,
  };
  public static readonly encoding: string = "utf8";
  public static readonly timeout: number = 5000;
}
