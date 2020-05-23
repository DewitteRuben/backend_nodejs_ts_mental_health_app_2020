import { RequestHandler } from "express";
import handleErrorMiddleware from "../../middleware/handle-error-middleware";
import MoodEntry from "../../models/MoodEntry";

const filter: RequestHandler = async (req, res, next) => {
  const { props } = req.query;

  if (!props) {
    return next();
  }

  const { userId } = req.body.auth;

  const moodEntries = await MoodEntry.find({ userId }, `${typeof props === "string" ? props : props.join(" ")} -_id`);

  return res.json(moodEntries);
};

export default handleErrorMiddleware(filter);
