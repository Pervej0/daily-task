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
import validationChecker from "../../middleware/validationChecker";
import {
  updateUserValidationSchema,
  userValidationSchema,
} from "./profile.validation";

const router = express.Router();

// user profile
router.get("/profile", auth(), getMyProfile);
router.put(
  "/profile",
  validationChecker(updateUserValidationSchema),
  auth(),
  updateMyProfile
);

// authentication
router.post("/register", validationChecker(userValidationSchema), register);
router.post("/login", loginUser);
router.put("/forgot-password", forgotPasswordDB);
router.put("/reset-password", resetPassword);

export const authRoutes = router;
