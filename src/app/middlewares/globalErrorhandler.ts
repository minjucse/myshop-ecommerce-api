import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { handleCastError } from "../helpers/handleCastError";
import { handlerDuplicateError } from "../helpers/handleDuplicateError";
import { handlerValidationError } from "../helpers/handlerValidationError";
import { handlerZodError } from "../helpers/handlerZodError";
import { TErrorSources } from "../interfaces/error.types";

// Extend Request type to include multer properties
interface MulterRequest extends Request {
  file?: Express.Multer.File;
  files?: Express.Multer.File[];
}

export const globalErrorHandler = async (
  err: unknown,
  req: MulterRequest,
  res: Response,
  next: NextFunction
) => {
  if (envVars.NODE_ENV === "development") {
    console.error(err);
  }

  // You can log file info if needed
  if (req.file) {
    console.log("Uploaded file:", req.file.path);
  }
  if (req.files && Array.isArray(req.files)) {
    console.log("Uploaded files:", req.files.map(f => f.path));
  }

  let errorSources: TErrorSources[] = [];
  let statusCode = 500;
  let message = "Something Went Wrong!!";

  if (err && typeof err === "object" && "code" in err && (err as any).code === 11000) {
    const simplifiedError = handlerDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  } else if (err && typeof err === "object" && "name" in err) {
    if ((err as any).name === "CastError") {
      const simplifiedError = handleCastError(err);
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message;
    } else if ((err as any).name === "ZodError") {
      const simplifiedError = handlerZodError(err);
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message;
      errorSources = simplifiedError.errorSources as TErrorSources[];
    } else if ((err as any).name === "ValidationError") {
      const simplifiedError = handlerValidationError(err);
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message;
      errorSources = simplifiedError.errorSources as TErrorSources[];
    }
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err: envVars.NODE_ENV === "development" ? err : null,
    stack: envVars.NODE_ENV === "development" ? (err as Error).stack : null
  });
};
