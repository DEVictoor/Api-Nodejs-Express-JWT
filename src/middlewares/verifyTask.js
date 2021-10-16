import Task from "../models/Task";

export const checkTaskExisted = async (req, res, next) => {
  const tasksReceived = req.body.tasks;

  if (tasksReceived) {
    if (tasksReceived.isArray()) {
      const tasks = await Task.find({}, { name: 1 }); //encuentra los nombres de las tasks

      for (let i = 0; i < tasksReceived.length; i++) {
        let taskNotFound = [];
        if (!tasks.includes(req.body.tasks[i])) {
          taskNotFound.push(req.body.tasks[i]);
        }
      }
      if (taskNotFound.length === 0) {
        next();
      } else {
        let taskString = taskNotFound.toString();
        return res.status(400).json({
          message: `Task ${taskString} does not exits`,
        });
      }
    } else {
        return res.status(400).json({
            message: `Only one Array data type error is allowed`,
          });
    }
  } else {
    return res.status(400).json({
      message: `Not found tasks`,
    });
  }
};
