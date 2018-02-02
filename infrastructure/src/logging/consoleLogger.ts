"use strict";

import { injectable } from "inversify";
import "reflect-metadata";
import * as Winston from "winston";
import { App } from "~/config";
import { ILogger } from "~/core";

@injectable()
export class ConsoleLogger implements ILogger {
  private logger: Winston.LoggerInstance;
  public constructor() {
    this.logger = new Winston.Logger({
      transports: [
        new Winston.transports.Console({
          silent: App.isTest,
          level: App.logLevel,
          colorize: true,
          timestamp: true,
        }),
      ],
    });
  }

  public debug(format: string, ...params: any[]): void {
    this.logger.debug.apply(this, [format].concat(params));
  }

  public info(format: string, ...params: any[]): void {
    this.logger.info.apply(this, [format].concat(params));
  }

  public warn(format: string, ...params: any[]): void {
    this.logger.warn.apply(this, [format].concat(params));
  }

  public error(format: string | Error, ...params: any[]): void {
    this.logger.error.apply(this, [format].concat(params));
  }
}
