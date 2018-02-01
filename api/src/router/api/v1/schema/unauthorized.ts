"use strict";

import * as Joi from "joi";

const Unauthorized = Joi.object({
  statusCode: Joi.number().required().example(401),
  error: Joi.string().example("Unauthorized"),
  message: Joi.string().example("Missing authentication"),
  attributes: Joi.object({
    error: Joi.string().example("Invalid Token"),
  }).optional().meta({ className: "Unauthorized Error Attributes"}),
})
.meta({ className: "Unauthorized"});

export { Unauthorized };
