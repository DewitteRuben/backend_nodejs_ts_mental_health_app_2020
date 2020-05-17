import { RequestHandler } from "express";
import handleErrorMiddleware from "../../middleware/handle-error-middleware";
import MoodEntry from "../../models/MoodEntry";

const all: RequestHandler = async (req, res) => {
  const { userId } = req.body.auth;

  const moodEntries = await MoodEntry.find({ userId });

  return res.json(moodEntries);
};

export default handleErrorMiddleware(all);
