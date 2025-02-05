import { StatusCodes } from "http-status-codes";
import prisma from "../../shared/prisma";
import CustomError from "../../errors/CustomError";
import bcrypt from "bcrypt";
import generateToken from "../../helper/generateToken";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import decodeToken from "../../helper/decodeToken";
import sendResponse from "../../shared/sendResponse";
import forgetEmail from "../../template/forgetEmail";
import { Request, Response } from "express";
import { User } from "@prisma/client";

export const registerDB = async (payload: User) => {
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

export const loginUserDB = async (payload: {
  email: string;
  password: string;
}) => {
  const isUserExist = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });
  const comparePassword = await bcrypt.compare(
    payload.password,
    isUserExist.password
  );
  if (!comparePassword) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Password is not correct!");
  }
  const tokenPayload = {
    email: isUserExist.email,
    role: isUserExist.role,
  };
  const accessToken = generateToken(
    tokenPayload,
    config.ACCESS_TOKEN_SECRET as string,
    config.ACCESS_TOKEN_EXPIRES_IN as string
  );

  return {
    accessToken,
  };
};

export const forgotPasswordDB = async (req: Request, res: Response) => {
  const { email } = req.body;
  const getUser = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  });

  const tokenPayload = { email: getUser.email, role: getUser.role };

  const passwordResetToken = generateToken(
    tokenPayload,
    config.ACCESS_TOKEN_SECRET as Secret,
    "5m"
  );

  const resetLink = `${config.LOCAL_URL}/reset-password?userId=${getUser.id}&&token=${passwordResetToken}`;

  const info = await forgetEmail(getUser.email, resetLink);

  console.log("Message sent: %s", info.messageId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Email sent successfully to reset password!",
    data: "",
  });
};

export const resetPasswordDB = async (token: string, payload: any) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });
  const verifyToken = decodeToken(token, config.ACCESS_TOKEN_SECRET as Secret);
  console.log(verifyToken);
  if (!verifyToken) {
    throw new CustomError(StatusCodes.UNAUTHORIZED, "The user is time out!");
  }

  const hashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.SALT_ROUND) as number
  );

  const updatePassword = await prisma.user.update({
    where: {
      email: payload.email,
    },
    data: {
      password: hashPassword,
    },
  });

  return updatePassword;
};
