import express, { json, Router } from "express";
import { getTareas, createTarea, getOneTarea, deleteTarea, updateTarea, getEstadistica} from "../controllers/tareas.js";

const router = express.Router();

router.get("/tareas", getTareas);
router.post("/tareas", createTarea);
router.get("/tareas/:id", getOneTarea);
router.delete("/tareas/:id", deleteTarea);
router.put("/tareas/:id", updateTarea);
router.get("/estadistica", getEstadistica);

export default router;
