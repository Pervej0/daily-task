import { User } from "@prisma/client";
import prisma from "../../shared/prisma";
import bcrypt from "bcrypt";
import config from "../../config";

export const createUserDB = async (payload: User) => {
  const hashPassword = await bcrypt.hash(
    payload.password,
    Number(config.SALT_ROUND) as number
  );

  payload.password = hashPassword;

  const user = await prisma.user.create({
    data: payload,
    select: {
      fullName: true,
      email: true,
      role: true,
      bio: true,
      tasks: {
        include: {
          user: true,
        },
      },
    },
  });

  return user;
};
