"use strict";

export class App {
  public static readonly env: string = process.env.NODE_ENV || "development";
  public static readonly port: number = Number(process.env.PORT || 3000);
  public static readonly logLevel: string = process.env.LOG_LEVEL || "debug";
  public static get isTest(): boolean {
    return this.env === "test";
  }
  public static get isDevelopment(): boolean {
    return this.env === "development";
  }
}
