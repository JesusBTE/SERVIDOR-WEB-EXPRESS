import { Router } from "express";

let contador = 3;

let tareas = [
  {
    tarea: "Desarrollo de servicios web",
    descripcion: "Enviar examen de diagnostico",
    id: 1,
    completado: false,
  },

  {
    tarea: "DAM",
    descripcion: "Hacer collage",
    id: 2,
    completado: true,
  },

  {
    tarea: "Interfaces web",
    descripcion: "Formar equipos",
    id: 3,
    completado: true,
  },
];

export const getTareas = function (req, res) {
  res.json(tareas);
};

export const createTarea = function (req, res) {
  const { tarea, descripcion, completado } = req.body;
  contador += 1;

  tareas.push({
    tarea,
    descripcion,
    completado,
    id: contador,
  });

  res.json(tareas);
};

export const getOneTarea = function (req, res) {
  const tareaId = req.params.id;

  const tarea = tareas.find(function (tarea) {
    return tarea.id === Number(tareaId);
  });

  res.json(tarea);
};

export const deleteTarea = function (req, res) {
  const tareaId = req.params.id;

  tareas = tareas.filter(function (tarea) {
    return tarea.id !== Number(tareaId);
  });

  res.json(tareas);
};

export const updateTarea = function (req, res) {
  const tareaId = Number(req.params.id);
  const { tarea, descripcion, completado } = req.body;

  tareas = tareas.map(function (item) {
    if (item.id === tareaId) {
      return {
        tarea: tarea,
        descripcion: descripcion,
        id: tareaId,
        completado: completado,
      };
    } else {
      return item;
    }
  });

  res.json(tareas);
};

export const getEstadistica = function (req, res) {
  if (tareas.length === 0) {
    return res.status(404).json({ message: "No hay tareas registradas." });
  }

  const totalTareas = tareas.length;

  const tareasCompletadas = tareas.filter((t) => t.completado).length;
  const tareasPendientes = totalTareas - tareasCompletadas;

  const tareaMasReciente = tareas[tareas.length - 1];
  const tareaMasAntigua = tareas[0];

  res.json({
    totalTareas,
    tareaMasReciente,
    tareaMasAntigua,
    tareasCompletadas,
    tareasPendientes,
  });
};
