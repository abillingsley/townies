"use strict";

import { Transform } from "stream";
import { ILogger } from "~/core";

export class GoodLogger extends Transform {
  constructor(private logger: ILogger = console) {
    super({ objectMode: true });
  }

  public _write(event: any, encoding: string, callback: any) {
    const eventName = event.event;
    let tags = [];
    if (Array.isArray(event.tags)) {
      tags = event.tags.concat([]);
    } else if (event.tags) {
      tags = [event.tags];
    }
    tags.unshift(eventName);

    switch (eventName) {
      case "log":
        return callback(null, this.logLogEvent(event, tags));
      case "ops":
        return callback(null, this.logOpsEvent(event, tags));
      case "request":
        return callback(null, this.logRequestEvent(event, tags));
      case "response":
        return callback(null, this.logResponseEvent(event, tags));
      case "error":
        return callback(null, this.logErrorEvent(event, tags));
      default:
        if (event.data instanceof Error) {
          const error = event.data;
          return callback(null, this.logErrorEvent(Object.assign(event, { error }), tags));
        } else {
          return callback();
        }
    }
  }

  private log(level: string, message: string, tags: string[]): string {
    const output = `[${tags.toString()}] ${message}`;
    switch (level) {
      case "debug":
        this.logger.debug(output);
        return output;
      case "info":
        this.logger.info(output);
        return output;
      case "warn":
        this.logger.warn(output);
        return output;
      case "error":
        this.logger.error(output);
        return output;
      default:
        return output;
    }
  }

  private logLogEvent(event: any, tags: string[] = []): string {
    const data = event.data ? JSON.stringify(event.data) : "";
    const output = `${data}`;

    return this.log("info", output, tags);
  }

  private logOpsEvent(event: any, tags: string[] = []): string {
    const memory = Math.round(event.proc.mem.rss / (1024 * 1024));
    const uptime = event.proc.uptime;
    const load = event.os.load;
    const output = `memory: ${memory}Mb, uptime: ${uptime}s, load: ${load}`;

    return this.log("debug", output, tags);
  }

  private logRequestEvent(event: any, tags: string[] = []): string {
    const data = event.data ? JSON.stringify(event.data) : "";
    const method = event.method.toUpperCase();
    const output = `${event.instance}: ${method} ${event.path} ${data}`;

    return this.log("info", output, tags);
  }

  private logResponseEvent(event: any, tags: string[] = []): string {
    const query = event.query ? JSON.stringify(event.query) : "";
    const method = event.method.toUpperCase();
    const statusCode = event.statusCode || "";
    const output = `${event.instance}: ${method} ${event.path} ${query} ${statusCode} (${event.responseTime}ms)`;

    return this.log("info", output, tags);
  }

  private logErrorEvent(event: any, tags: string[] = []): string {
    const output = `message: ${event.error.message}, stack: ${event.error.stack}`;

    return this.log("error", output, tags);
  }
}
