import { ZodError } from "zod";
import {
  TErrorDetails,
  TCustomSimplifiedError,
} from "../interface/global.type";
import { StatusCodes } from "http-status-codes";

const handleValidationError = (error: ZodError): TCustomSimplifiedError => {
  let zodMessage = "";
  const errorDetails: TErrorDetails = error.issues.map((issue) => {
    zodMessage += issue.message + " ";
    return {
      field: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = StatusCodes.BAD_REQUEST;
  return {
    statusCode,
    message: zodMessage || "Validation error occur!",
    errorDetails,
  };
};

export default handleValidationError;
