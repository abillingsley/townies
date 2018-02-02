"use strict";

import { Container } from "inversify";
import { IDatabase, Identifiers, ILogger } from "~/core";
import { ConsoleLogger, Database, RollbarLogger } from "~/infrastructure";

export default function(container: Container) {
  container.bind<IDatabase>(Identifiers.Database)
           .to(Database).inSingletonScope();
  container.bind<ILogger>(Identifiers.Logger)
           .to(ConsoleLogger);
  container.bind<ILogger>(Identifiers.RemoteLogger)
           .to(RollbarLogger);
}
