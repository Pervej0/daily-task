import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import asyncCatch from "../../shared/asyncCatch";
import sendResponse from "../../shared/sendResponse";
import { loginUserDB } from "./auth.service";

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
