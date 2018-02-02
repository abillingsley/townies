"use strict";

import { injectable } from "inversify";
import "reflect-metadata";
import * as Rollbar from "rollbar";
import { App, Rollbar as RollbarConfig } from "~/config";
import { ILogger } from "~/core";

@injectable()
export class RollbarLogger implements ILogger {
  private logger: Rollbar;
  public constructor() {
    this.logger = new Rollbar({
      accessToken: RollbarConfig.accessToken,
      enabled: !(App.isTest || App.isDevelopment),
    });
  }

  public debug(format: string, ...params: any[]): void {
    this.logger.debug(format, params);
  }

  public info(format: string, ...params: any[]): void {
    this.logger.info(format, params);
  }

  public warn(format: string, ...params: any[]): void {
    this.logger.warn(format, params);
  }

  public error(format: string | Error, ...params: any[]): void {
    this.logger.error(format, params);
  }
}
