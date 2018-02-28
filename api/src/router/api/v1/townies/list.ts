"use strict";

import {
  Base_Reply, Request,
  RouteAdditionalConfigurationOptions, RouteResponseConfigurationObject, RouteValidationConfigurationObject,
} from "hapi";
import ApplicationAuthorizedRoute from "../applicationAuthorizedRoute";
import { Paging } from "../schema";

export class List extends ApplicationAuthorizedRoute implements RouteAdditionalConfigurationOptions {
  public description: string = "List Townies";
  public notes: string = "Returns a list of all townies.";
  public get validate(): RouteValidationConfigurationObject {
    return Object.assign(super.validate, {
      query: Paging,
    });
  }
  public response: RouteResponseConfigurationObject = {
    status: {
      // 200: Schema,
    },
  };

  public async handler(request: Request, reply: Base_Reply) {
    reply({});
  }
}
