"use strict";

import * as Joi from "joi";

const NotFound = Joi.object({
  statusCode: Joi.number().required().example(404),
  error: Joi.string().example("Not Found"),
  message: Joi.string().example("Not Found"),
})
.meta({ className: "Not Found"});

export { NotFound };
