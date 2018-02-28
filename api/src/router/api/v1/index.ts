"use strict";

import { Server } from "hapi";
import { IRouteRegistration, RouteRegistrationCallback } from "../iRouteRegistration";
import * as Townies from "./townies";

export default class Routes {
  constructor() {
    this.register.attributes = {
      name: "api/v1",
    };
  }

  public register: IRouteRegistration = (server: Server, options: any, next: RouteRegistrationCallback) => {
    server.route([
      { method: "GET", path: "/api/v1/townies", config: new Townies.List() },
    ]);

    next();
  }
}
