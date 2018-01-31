"use strict";

import { RepositoryId } from "~/core";

export interface IdFactory {
  createId(): RepositoryId;
}
