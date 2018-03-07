"use strict";

import { Container } from "inversify";
import { Identifiers, ILogger } from "~/core";
import { ConsoleLogger } from "~/infrastructure";

export default function(container: Container) {
  container.bind<ILogger>(Identifiers.Logger)
           .to(ConsoleLogger);
}
