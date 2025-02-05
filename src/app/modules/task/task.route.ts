import express from "express";
import {
  createTask,
  deleteTask,
  getSingleTask,
  getTasks,
  updateTask,
} from "./task.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.get("/", auth(), getTasks);
router.get("/:id", auth(), getSingleTask);
router.post("/", auth(), createTask);
router.put("/:id", auth(), updateTask);
router.delete("/:id", auth(), deleteTask);

export const taskRoutes = router;
