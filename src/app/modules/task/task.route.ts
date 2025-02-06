import express from "express";
import {
  createTask,
  deleteTask,
  getSingleTask,
  getTasks,
  updateTask,
} from "./task.controller";
import auth from "../../middleware/auth";
import validationChecker from "../../middleware/validationChecker";
import {
  taskValidationSchema,
  updateTaskValidationSchema,
} from "./task.validation";

const router = express.Router();

router.get("/", auth(), getTasks);
router.get("/:id", auth(), getSingleTask);
router.post("/", validationChecker(taskValidationSchema), auth(), createTask);
router.put(
  "/:id",
  validationChecker(updateTaskValidationSchema),
  auth(),
  updateTask
);
router.delete("/:id", auth(), deleteTask);

export const taskRoutes = router;
