import { RequestHandler } from "express";
import { v4 as uuid } from "uuid";
import { getMissingParamsMessage } from "../../utils/string";
import { ApplicationError } from "../../errors";
import Task from "../../models/Task";

const add: RequestHandler = async (req, res, next) => {
  const { userId, title, description } = req.body;
  const { professionalId } = req.body.auth;

  const params = { userId, title, description };
  const message = getMissingParamsMessage(params);

  if (message.length) {
    throw new ApplicationError(`The request is missing the following parameters: ${message}`, 400);
  }

  const taskId = uuid();
  const newTask = await Task.create({ userId, taskId, title, description, professionalId });

  return res.json({ message: "Task has been successfully created.", task: newTask.toJSON() });
};

export default add;
