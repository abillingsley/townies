"use strict";

import {
  AuthOptions, RouteAdditionalConfigurationOptions, RoutePrerequisitesArray,
  RouteValidationConfigurationObject,
} from "hapi";
import { Authorization } from "./schema";

export default class ApplicationAuthorizedRoute implements RouteAdditionalConfigurationOptions {
  public tags: string[] = ["api", "application api"];

  public auth: false | string | AuthOptions = {
    mode: "required",
    strategy: "jwt",
    access: {
      entity: "user",
    },
  };
  public get validate(): RouteValidationConfigurationObject {
    return { headers: Authorization.options({ allowUnknown: true }) };
  }
  public pre: RoutePrerequisitesArray = [];
}
