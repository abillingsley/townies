"use strict";

import { Server } from "hapi";
import { IRouteRegistration, RouteRegistrationCallback } from "../iRouteRegistration";

export default class Routes {
  constructor() {
    this.register.attributes = {
      name: "api/v1",
    };
  }

  public register: IRouteRegistration = (server: Server, options: any, next: RouteRegistrationCallback) => {
    server.route([
    ]);

    next();
  }
}
