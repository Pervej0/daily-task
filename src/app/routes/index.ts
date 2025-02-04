import express from "express";
import { authRoutes } from "../modules/auth/auth.route";

const router = express.Router();

const allRoutes: { path: string; route: any }[] = [
  { path: "/auth", route: authRoutes },
];

allRoutes.forEach((rt) => router.use(rt.path, rt.route));

export const RootRoute = router;
