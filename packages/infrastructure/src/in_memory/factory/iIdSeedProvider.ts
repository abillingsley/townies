"use strict";

import { RepositoryId } from "~/core";

export interface IdSeedProvider {
  next(): RepositoryId;
}
