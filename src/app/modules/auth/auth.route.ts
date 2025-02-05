import express from "express";
import { loginUser, register, resetPassword } from "./auth.controller";
import { forgotPasswordDB } from "./auth.service";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", loginUser);
router.put("/forgot-password", forgotPasswordDB);
router.put("/reset-password", auth(), resetPassword);

export const authRoutes = router;
