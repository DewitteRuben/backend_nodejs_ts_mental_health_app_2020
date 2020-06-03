import { RequestHandler } from "express";
import { ApplicationError } from "../../errors";
import Task from "../../models/Task";
import { getMissingParamsMessage } from "../../utils/string";

const deleteTask: RequestHandler = async (req, res) => {
  const { taskId } = req.body;
  const { professionalId } = req.body.auth;

  const message = getMissingParamsMessage({ taskId });
  if (message.length) {
    throw new ApplicationError(`The following parameters are missing: ${message}`, 400);
  }

  const task = await Task.findOne({ taskId });

  if (task.professionalId !== professionalId) {
    throw new ApplicationError("Unable to update task, professionalId mismatch.", 401);
  }

  const removedTask = await task.remove();

  return res.json({ message: "Successfully removed task.", task: removedTask.toJSON() });
};

export default deleteTask;
