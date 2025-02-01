import express from "express";
import {getTask, createTask, updateTask, getStats, getOneTask, deleteTask } from "../controllers/task.js";

const router = express.Router();

router.get("/tasks", getTask);
router.post("/tasks", createTask);
router.get("/tasks/:id", getOneTask);
router.delete("/tasks/:id", deleteTask);
router.put("/tasks/:id", updateTask);
router.get("/stats", getStats);

export default router;
