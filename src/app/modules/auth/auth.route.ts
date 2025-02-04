import express, { NextFunction } from "express";
import { loginUser } from "./auth.controller";
import { forgotPasswordDB } from "./auth.service";

const router = express.Router();

router.post("/login", loginUser);
router.put("/forgot-password", forgotPasswordDB);

export const authRoutes = router;
