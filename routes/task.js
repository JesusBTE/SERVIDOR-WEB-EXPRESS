import express, { json, Router } from "express";
import {
  getUsers,
  createUser,
  getOneUser,
  deleteUser,
  updateUser,
  getStats,
} from "../controllers/task.js";

const router = express.Router();

router.get("/tasks", getUsers);
router.post("/tasks", createUser);
router.get("/tasks/:id", getOneUser);
router.delete("/tasks/:id", deleteUser);
router.put("/tasks/:id", updateUser);
router.get("/stats", getStats);

export default router;
