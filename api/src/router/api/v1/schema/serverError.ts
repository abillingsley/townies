"use strict";

import * as Joi from "joi";

const ServerError = Joi.object({
  statusCode: Joi.number().required().example(401),
  error: Joi.string().example("Internal Server Error"),
  message: Joi.string().example("An internal server error occurred"),
})
.meta({ className: "ServerError"});

export { ServerError };
