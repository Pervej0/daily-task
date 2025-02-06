import express from "express";
import {
  getMyProfile,
  loginUser,
  register,
  resetPassword,
  updateMyProfile,
} from "./auth.controller";
import { forgotPasswordDB } from "./auth.service";
import auth from "../../middleware/auth";

const router = express.Router();

// user profile
router.get("/profile", auth(), getMyProfile);
router.put("/profile", auth(), updateMyProfile);

// authentication
router.post("/register", register);
router.post("/login", loginUser);
router.put("/forgot-password", forgotPasswordDB);
router.put("/reset-password", auth(), resetPassword);

export const authRoutes = router;
