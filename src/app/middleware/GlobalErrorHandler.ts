import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import handleValidationError from "../errors/handleValidationError";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || "Something Went Wrong!";
  let error = err;

  if (err instanceof Error) {
    message = err.message;
    error = err;
  }
  if (err instanceof ZodError) {
    const customSimplifiedError = handleValidationError(err);
    message = customSimplifiedError?.message;
    error = customSimplifiedError?.errorDetails;
  }

  res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    statusCode,
    success: false,
    message: message,
    error,
  });

  next();
};

export default globalErrorHandler;
