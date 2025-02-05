import { Prisma, Task } from "@prisma/client";
import prisma from "../../shared/prisma";
import paginationCalculator from "../../helper/paginationCalculator";

export const getTasksDB = async (
  query: Record<string, any>,
  options: Record<string, unknown>
) => {
  const { page, skip, limit, sortBy, sortOrder } =
    paginationCalculator(options);

  const { ...filterData } = query;
  const andCondition: Prisma.TaskWhereInput[] = [];

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.TaskWhereInput = { AND: andCondition };

  const result = await prisma.task.findMany({
    where: whereCondition,
    skip,
    take: limit,
  });

  const count = await prisma.task.count({
    where: whereCondition,
  });

  return {
    meta: {
      page,
      limit,
      total: count,
    },
    data: result,
  };
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
