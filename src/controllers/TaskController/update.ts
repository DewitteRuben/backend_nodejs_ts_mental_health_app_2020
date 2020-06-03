import { RequestHandler } from "express";
import { ApplicationError } from "../../errors";
import Task from "../../models/Task";
import { getMissingParamsMessage } from "../../utils/string";

const update: RequestHandler = async (req, res) => {
  const { taskId, completed } = req.body;
  const { userId } = req.body.auth;

  const message = getMissingParamsMessage({ taskId, completed });
  if (message.length) {
    throw new ApplicationError(`The following parameters are missing: ${message}`, 400);
  }

  if (typeof completed !== "boolean") {
    throw new ApplicationError("The completed parameters needs to be of type 'boolean'.", 400);
  }

  const task = await Task.findOne({ taskId });

  if (task.userId !== userId) {
    throw new ApplicationError("Unable to update task, userId mismatch.", 401);
  }

  task.completed = completed;
  task.dateOfCompletion = completed ? new Date() : undefined;

  const updatedTask = await task.save();

  return res.json({ message: "Successfully updated task status.", task: updatedTask.toJSON() });
};

export default update;
