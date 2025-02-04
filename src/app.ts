import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { notFound } from "./app/middleware/notFound";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Welcome to Server Site",
  });
});

app.use(notFound);
export default app;
