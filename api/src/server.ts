"use strict";

import { Request, Server as HapiServer } from "hapi";
import { Identifiers, ILogger } from "~/core";
import Container from "./container";
import Plugins from "./plugins";
import Routes from "./plugins/routes";

export interface IServerOptions {
  host?: string;
  port?: number;
}

export class Server {
  protected server: HapiServer;

  constructor(options?: IServerOptions) {
    this.server = new HapiServer();
    this.server.connection(options);
    this.server.on("request-error", (request: Request, error: Error) =>
      Container.get<ILogger>(Identifiers.RemoteLogger).error(error),
    );
  }

  public async register(): Promise<HapiServer> {
    return new Promise<HapiServer>((resolve, reject) => {
      this.server.register(Plugins, (registrationError: Error) => {
        if (registrationError) {
          reject(registrationError);
        } else {
          this.server.register(Routes, (routingError: Error) => {
            if (routingError) {
              reject(routingError);
            } else {
              resolve(this.server);
            }
          });
        }
      });
    });
  }

  public async start(): Promise<void> {
    return this.register().then((server: HapiServer) => {
      server.start((err: Error) => {
        if (err) {
          Promise.reject(err);
        } else {
          Promise.resolve();
        }
      });
    });
  }
}
