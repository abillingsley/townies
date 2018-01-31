"use strict";

import * as Joi from "joi";

const Paging = Joi.object({
  limit: Joi.number().integer().min(1).max(40).default(20),
  offset: Joi.number().integer().min(0).default(0),
})
.meta({ className: "Paging" });

export { Paging };
