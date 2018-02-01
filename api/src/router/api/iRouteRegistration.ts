"use strict";

import { Server } from "hapi";

export type RouteRegistrationCallback = (err?: Error) => void;

export interface IRouteRegistration {
  (server: Server, options: any, next: RouteRegistrationCallback): void;
  attributes?: any;
}
