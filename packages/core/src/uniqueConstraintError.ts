"use strict";

import { ValidationError } from "./validationError";

export class UniqueConstraintError extends ValidationError {
  constructor(public message: string, public errors: string[]) {
    super(message, errors);
    this.name = "UniqueConstraintError";
    this.message = "Unique Constraint Error";
    Error.captureStackTrace(this, this.constructor);
  }
}
