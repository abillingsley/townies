"use strict";

import { Container } from "inversify";
import config from "./inversify";

export default function(container: Container) {
  // inherit all the default configuration
  config(container);
}
