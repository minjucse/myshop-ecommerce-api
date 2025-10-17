/* eslint-disable @typescript-eslint/no-unused-vars */
import { DatabaseError } from "sequelize";
import { TGenericErrorResponse } from "../interfaces/error.types";

export const handleCastError = (err: DatabaseError): TGenericErrorResponse => {
  return {
    statusCode: 400,
    message: "Invalid input or malformed query. Please check your request."
  };
};
