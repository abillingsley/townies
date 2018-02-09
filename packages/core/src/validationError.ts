"use strict";

import { BaseError } from "./baseError";

export class ValidationError extends BaseError {
  constructor(public message: string, public errors: string[]) {
    super(message);
    this.name = "ValidationError";
    this.message = "Validation Error";
    this.errors = errors || [];

    if (message) {
      this.message = message;
    } else if (this.errors.length > 0) {
      this.message = this.errors.join(",\n");
    }
    Error.captureStackTrace(this, this.constructor);
  }
}
