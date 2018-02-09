"use strict";

import * as Joi from "joi";

const Conflict = Joi.object({
  statusCode: Joi.number().required().example(409),
  error: Joi.string().example("Conflict"),
  message: Joi.string().example("Conflict"),
})
.meta({ className: "Conflict"});

export { Conflict };
