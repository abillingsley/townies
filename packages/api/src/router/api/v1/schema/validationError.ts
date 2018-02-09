"use strict";

import * as Joi from "joi";

const ValidationError = Joi.object({
  statusCode: Joi.number().required().example(400),
  error: Joi.string().example("Bad Request"),
  message: Joi.string().example("child \"name\" fails because [\"name\" is required]"),
  validation: Joi.object({
    source: Joi.string().required().regex(/^payload$/),
    keys: Joi.array().required().items(Joi.string()),
  }).meta({ className: "ValidationError Details"}),
})
.meta({ className: "ValidationError"});

export { ValidationError };
