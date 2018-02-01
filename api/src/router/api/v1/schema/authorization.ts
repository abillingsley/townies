"use strict";

import * as Joi from "joi";

const Authorization = Joi.object({
  authorization: Joi.string().required().example("Bearer Aai...tww"),
})
.meta({ className: "Authorization"});

export { Authorization };
