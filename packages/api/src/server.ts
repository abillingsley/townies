"use strict";

import { Server as HapiServer } from "hapi";
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
    // this.server.on("request-error", (request: Request, error: Error) => {
    //   rollbar.error(request, error);
    // });
  }

  public async start(options?: IServerOptions): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.server.register(Plugins, (registrationError: Error) => {
        if (registrationError) {
          reject(registrationError);
        } else {
          this.server.register(Routes, (routingError: Error) => {
            if (routingError) {
              reject(routingError);
            } else {
              this.server.start((err: Error) => {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              });
            }
          });
        }
      });
    });
  }
}
