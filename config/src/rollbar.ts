"use strict";

import { Secrets } from "./secrets";

export class Rollbar {
  public static readonly accessToken: string = Secrets.RollbarAccessToken || "";
}
