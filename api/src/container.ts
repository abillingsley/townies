"use strict";
/* tslint:disable:no-var-requires */

import "reflect-metadata";

import { Container } from "inversify";
import { App } from "~/config";

const container = new Container();
if (App.isTest) {
  require("./inversify.test").default(container);
} else {
  require("./inversify").default(container);
}

export default container;
