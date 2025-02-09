import { RequestHandler } from "express";
import asyncCatch from "../../shared/asyncCatch";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import {
  createTaskDB,
  deleteTaskDB,
  getSingleTaskDB,
  getTasksDB,
  updateTaskDB,
} from "./task.service";
import { pick } from "../../shared/pick";
import { selectedTaskQueryItems } from "./task.constant";
import { paginationOptionItem } from "../../helper/paginationCalculator";

export const getTasks: RequestHandler = asyncCatch(async (req: any, res) => {
  const query = pick(req.query, selectedTaskQueryItems);
  const paginationOption = pick(req.query, paginationOptionItem);
  const result = await getTasksDB(query, paginationOption);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Tasks retrieved successfully!",
    meta: result.meta,
    data: result.data,
  });
});

export const getSingleTask: RequestHandler = asyncCatch(async (req, res) => {
  const result = await getSingleTaskDB(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Task retrieved successfully!",
    data: result,
  });
});

export const createTask: RequestHandler = asyncCatch(async (req: any, res) => {
  const result = await createTaskDB(req.body, req.user);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Task Created Successfully!",
    data: result,
  });
});

export const updateTask: RequestHandler = asyncCatch(async (req: any, res) => {
  const result = await updateTaskDB(req.params.id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Task updated Successfully!",
    data: result,
  });
});

export const deleteTask: RequestHandler = asyncCatch(async (req: any, res) => {
  const result = await deleteTaskDB(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Task deleted Successfully!",
    data: result,
  });
});
