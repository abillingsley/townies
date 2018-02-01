"use strict";

import * as uuid from "uuid";
import { RepositoryId } from "~/core";
import { IdSeedProvider } from "./factory/iIdSeedProvider";

export class UUIDProvider implements IdSeedProvider {
  public next(): RepositoryId {
    return uuid.v4();
  }
}
