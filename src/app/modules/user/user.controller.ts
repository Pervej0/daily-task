import { RequestHandler } from "express";
import asyncCatch from "../../shared/asyncCatch";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { createUserDB } from "./user.service";

export const createUser: RequestHandler = asyncCatch(async (req, res) => {
  const result = await createUserDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "User Created Successfully!",
    data: result,
  });
});
