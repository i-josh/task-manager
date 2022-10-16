import Task from "../models/Task.js";
import { asyncWrapper } from "../middleware/async.js";
import { createCustomError } from "../errors/custom_error.js";

export const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.json({ tasks });
});

export const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

export const getTask = asyncWrapper(async (req, res,next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });

  if (!task) {
    return next(createCustomError("task doesnt exist",404))
  }
  res.json({ task });
});

export const updateTask = asyncWrapper(async (req, res,next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError("task doesnt exist",404))
  }

  res.json({ message: "updated", task });
});

export const deleteTask = asyncWrapper(async (req, res,next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });

  if (!task) {
    return next(createCustomError("task doesnt exist",404))
  }
  res.json({ message: "deleted", task });
});
