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

export const getMyProfileDB = async (user: { email: string }) => {
  const profile = await prisma.user.findUniqueOrThrow({
    where: { email: user.email },
    include: {
      tasks: true,
    },
  });

  return profile;
};

export const updateMyProfileDB = async (
  user: { email: string },
  payload: any
) => {
  const profile = await prisma.user.update({
    where: { email: user.email },
    data: payload,
  });

  return profile;
};

export const registerDB = async (payload: User) => {
  const hashPassword = await bcrypt.hash(
    payload.password,
    Number(config.SALT_ROUND) as number
  );

  payload.password = hashPassword;

  const user = await prisma.user.create({
    data: payload,
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
  console.log(req.body, req);
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

  const resetLink = `${config.LOCAL_URL}/auth/reset-password?userId=${getUser.id}&&token=${passwordResetToken}`;

  const info = await forgetEmail(getUser.email, resetLink);

  console.log("Message sent: %s", info.messageId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Email sent successfully to reset password!",
    data: "",
  });
};

export const resetPasswordDB = async (token: string, payload: any) => {
  console.log(token, payload, "XXX");
  await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
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
      id: payload.id,
    },
    data: {
      password: hashPassword,
    },
  });

  return updatePassword;
};
