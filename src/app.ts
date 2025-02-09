import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { notFound } from "./app/middleware/notFound";
import { StatusCodes } from "http-status-codes";
import { RootRoute } from "./app/routes";
import cors from "cors";
import globalErrorHandler from "./app/middleware/GlobalErrorHandler";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", RootRoute);

app.get("/", (req: Request, res: Response) => {
  res.send({
    status: StatusCodes.OK,
    success: true,
    message: "Welcome to The Server Site",
  });
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;
