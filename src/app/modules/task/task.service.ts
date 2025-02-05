import { Task } from "@prisma/client";
import prisma from "../../shared/prisma";

export const getTasksDB = async () => {
  const tasks = await prisma.task.findMany({});
  return tasks;
};

export const getSingleTaskDB = async (id: string) => {
  const task = await prisma.task.findUniqueOrThrow({
    where: { id: id },
  });
  return task;
};

export const createTaskDB = async (payload: Task, user: { email: string }) => {
  const getUser = await prisma.user.findUniqueOrThrow({
    where: { email: user.email },
  });
  payload.userId = getUser.id;
  const task = await prisma.task.create({ data: payload });

  return task;
};

export const updateTaskDB = async (taskId: string, payload: Partial<Task>) => {
  const updated = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: payload,
  });

  return updated;
};

export const deleteTaskDB = async (taskId: string) => {
  const deleted = await prisma.task.delete({
    where: {
      id: taskId,
    },
  });

  return deleted;
};
