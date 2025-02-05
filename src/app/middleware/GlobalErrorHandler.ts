import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || "Something Went Wrong!";
  let error = err;

  res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    statusCode,
    success: false,
    message: message,
    error,
  });

  next();
};

export default globalErrorHandler;
