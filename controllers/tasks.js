import Task from "../models/Task.js";

export async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find();
    res.json({ tasks });
  } catch (e) {
    res.status(500).json({ message: e });
  }
}

export async function createTask(req, res) {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (e) {
    res.status(500).json({ message: e });
  }
}

export async function getTask(req, res) {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });

    if (!task) {
      return res.status(404).json({ message: "task doesnt exist" });
    }
    res.json({ task });
  } catch (e) {
    res.status(500).json({ message: e });
  }
}

export async function updateTask(req, res) {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ message: "task doesnt exist" });
    }

    res.json({ message: "updated", task });
  } catch (e) {
    res.status(500).json({ message: e });
  }
}

export async function deleteTask(req, res) {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });

    if (!task) {
      return res.status(404).json({ message: "task doesnt exist" });
    }
    res.json({ message: "deleted", task });
  } catch (e) {
    res.status(500).json({ message: e });
  }
}
