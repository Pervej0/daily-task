import express from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { taskRoutes } from "../modules/task/task.route";

const router = express.Router();

const allRoutes: { path: string; route: any }[] = [
  { path: "/auth", route: authRoutes },
  { path: "/tasks", route: taskRoutes },
];

allRoutes.forEach((rt) => router.use(rt.path, rt.route));

export const RootRoute = router;
