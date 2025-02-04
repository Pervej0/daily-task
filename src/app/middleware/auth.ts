import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../config";
import CustomError from "../errors/CustomError";
import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import decodeToken from "../helper/decodeToken";

const auth = () => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new CustomError(
          StatusCodes.UNAUTHORIZED,
          "User is not authorized!"
        );
      }
      const userCredentials = decodeToken(
        token,
        config.ACCESS_TOKEN_SECRET as Secret
      ) as JwtPayload;

      // injecting user with req
      req.user = userCredentials;
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
