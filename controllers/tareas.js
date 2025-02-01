import { Router } from "express";

// Contador para los ID
let contador = 3;

// Arreglo que almacenará las tareas
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

// Obtener todas las tareas
export const getTareas = function (req, res) {
  res.json(tareas);
};

// Crear una nueva tarea
export const createTarea = function (req, res) {
  const { tarea, descripcion, completado } = req.body;
  contador += 1;

  // Validación de datos
  if (!tarea || !descripcion) {
    return res
      .status(400)
      .json({ error: "Se requiere 'tarea' y 'descripcion'." });
  }

  tareas.push({
    tarea,
    descripcion,
    completado: completado || false,
    id: contador,
  });

  res.json(tareas);
};

export const getOneTarea = function (req, res) {
  const tareaId = req.params.id;

  // Buscar la tarea
  const tarea = tareas.find(function (tarea) {
    return tarea.id === Number(tareaId);
  });

  if (!tarea) {
    return res.status(404).json({ error: "Tarea no encontrada." });
  } else {
    return res.json(tarea);
  }
};

export const deleteTarea = function (req, res) {
  const tareaId = req.params.id;
  const tareaIndex = tareas.findIndex((t) => t.id === Number(tareaId));

  if (tareaIndex === -1) {
    return res.status(404).json({ error: "Tarea no encontrada." });
  }

  tareas = tareas.filter(function (tarea) {
    return tarea.id !== Number(tareaId);
  });

  res.json(tareas);
};

export const updateTarea = function (req, res) {
  const tareaId = Number(req.params.id);

  const { tarea, descripcion, completado } = req.body;

  const tareaIndex = tareas.findIndex((t) => t.id === tareaId);

  if (tareaIndex === -1) {
    return res.status(404).json({ error: "Tarea no encontrada." });
  }

  // Validación de datos
  if (!tarea || !descripcion) {
    return res
      .status(400)
      .json({ error: "Se requiere 'tarea' y 'descripcion'." });
  }

  tareas = tareas.map(function (item) {
    if (item.id === tareaId) {
      return {
        tarea: tarea,
        descripcion: descripcion,
        id: tareaId,
        completado: completado || false,
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
