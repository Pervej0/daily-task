import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import asyncCatch from "../../shared/asyncCatch";
import sendResponse from "../../shared/sendResponse";
import { loginUserDB, registerDB, resetPasswordDB } from "./auth.service";

export const register: RequestHandler = asyncCatch(async (req, res) => {
  const result = await registerDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "User registered successfully!",
    data: result,
  });
});

export const loginUser: RequestHandler = asyncCatch(async (req, res) => {
  const result = await loginUserDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "User Logged in successfully!",
    data: {
      accessToken: result.accessToken,
    },
  });
});

export const resetPassword: RequestHandler = asyncCatch(
  async (req: any, res) => {
    const token = req.headers.authorization;
    const result = await resetPasswordDB(token, req.body);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Password reset successfully!",
      data: result,
    });
  }
);
