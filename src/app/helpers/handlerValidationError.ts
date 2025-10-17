import { ValidationError, ValidationErrorItem } from "sequelize";
import { TErrorSources, TGenericErrorResponse } from "../interfaces/error.types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handlerValidationError = (err: ValidationError): TGenericErrorResponse => {
  const errorSources: TErrorSources[] = [];

  err.errors.forEach((errorItem: ValidationErrorItem) => {
    errorSources.push({
      path: errorItem.path || "",
      message: errorItem.message,
    });
  });

  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
  };
};
