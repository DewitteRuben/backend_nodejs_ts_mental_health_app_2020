import { RequestHandler } from "express";
import Task from "../../models/Task";

const all: RequestHandler = async (req, res) => {
  const { userId } = req.body.auth;

  const tasks = await Task.find({ userId });

  return res.json(tasks);
};

export default all;
