import { v4 as uuidV4 } from "uuid";

let tasks = [
  {
    task: "Desarrollo de servicios web",
    description: "Enviar examen de diagnostico",
    id: uuidV4(),
    completed: false,
  },

  {
    task: "DAM",
    description: "Hacer collage",
    id: uuidV4(),
    completed: true,
  },

  {
    task: "Interfaces web",
    description: "Formar equipos",
    id: uuidV4(),
    completed: false,
  },
];

export const getUsers = function (req, res) {
  res.json(tasks);
};

export const createUser = function (req, res) {
  const { task, description } = req.body;

  tasks.push({
    task,
    description,
    id: uuidV4(),
  });

  res.json(tasks);
};

export const getOneUser = function (req, res) {
  const taskId = req.params.id;

  const task = tasks.find(function (task) {
    return task.id === taskId;
  });

  res.json(task);
};

export const deleteUser = function (req, res) {
  const taskId = req.params.id;

  tasks = tasks.filter(function (task) {
    return task.id !== taskId;
  });

  res.json(tasks);
};

export const updateUser = function (req, res) {
  const taskId = req.params.id;
  const { description, task } = req.body;

  tasks = tasks.map(function (t) {
    if (t.id === taskId) {
      return {
        ...t,
        task,
        description,
      };
    }
    return t;
  });

  res.json(tasks);
};

export const getStats = function (req, res) {
  if (tasks.length === 0) {
    return res.status(404).json({ message: "No hay tareas registradas." });
  }

  const totalTareas = tasks.length;

  const tareasCompletadas = tasks.filter((t) => t.completed).length;
  const tareasPendientes = totalTareas - tareasCompletadas;

  const tareaMasReciente = tasks[tasks.length - 1];
  const tareaMasAntigua = tasks[0];

  res.json({
    totalTareas,
    tareaMasReciente,
    tareaMasAntigua,
    tareasCompletadas,
    tareasPendientes,
  });
};
