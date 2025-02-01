let counter = 3;

let tasks = [
  {
    task: "Desarrollo de servicios web",
    description: "Enviar examen de diagnostico",
    id: 1,
    completed: false,
  },

  {
    task: "DAM",
    description: "Hacer collage",
    id: 2,
    completed: true,
  },

  {
    task: "Interfaces web",
    description: "Formar equipos",
    id: 3,
    completed: false,
  },
];

export const getTask = function (req, res) {
  res.json(tasks);
};

export const createTask = function (req, res) {
  const { task, description } = req.body;
  counter += 1;

  tasks.push({
    task,
    description,
    id: counter,
  });

  res.json(tasks);
};

export const getOneTask = function (req, res) {
  const taskId = req.params.id;

  const task = tasks.find(function (task) {
    return task.id === Number(taskId);
  });

  res.json(task);
};

export const deleteTask = function (req, res) {
  const taskId = req.params.id;

  tasks = tasks.filter(function (task) {
    return task.id !== taskId;
  });

  res.json(tasks);
};

export const updateTask = function (req, res) {
  const userId = req.params.id;
  const { task, description, completed } = req.body;

  tasks = task.map(function (user) {
    if (user.id === userId) {
      return {
        task: task,
        description: description,
        id: user.id,
      };
    } else {
      return task;
    }
  });

  res.json(tasks);
};

export const getStats = function (req, res) {
  if (tasks.length === 0) {
    return res.status(404).json({ message: "No hay tareas registradas." });
  }

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((t) => t.completed).length;
  const inCompletedTasks = totalTasks - completedTasks;

  const recentTask = tasks[tasks.length - 1];
  const oldestTask = tasks[0];

  res.json({
    totalTasks,
    recentTask,
    oldestTask,
    completedTasks,
    inCompletedTasks,
  });
};
