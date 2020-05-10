import { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import MoodEntry from "../../models/MoodEntry";
import handleErrorMiddleware from "../../middleware/handle-error-middleware";
import { isISODate } from "../../utils/date";
import { ApplicationError } from "../../errors";
import { getMissingParamsMessage } from "../../utils/string";

const add: RequestHandler = async (req, res) => {
  const { date, emotions, experiences, hoursOfSleep, thoughts, mood } = req.body;
  const { userId } = req.body.auth;

  if (!date || !emotions || !experiences || !hoursOfSleep || !thoughts || !mood) {
    const params: { [key: string]: any } = { date, emotions, experiences, hoursOfSleep, thoughts, mood };
    const message = getMissingParamsMessage(params);
    throw new ApplicationError(`The request is missing the following parameters: ${message}`, 400);
  }

  if (!userId) {
    throw new ApplicationError("Cannot create mood entry, unauthorized", 401);
  }

  if (!isISODate(date)) {
    throw new ApplicationError("The supplied date is not of valid ISO8061 format.", 400);
  }

  if (!Array.isArray(emotions)) {
    throw new ApplicationError("The supplied emotions should of be in array format", 400);
  }

  if (!Array.isArray(experiences)) {
    throw new ApplicationError("The supplied experiences should of be in array format", 400);
  }

  const entryId = uuidv4();

  const moodEntry = await MoodEntry.create({
    entryId,
    userId,
    date,
    emotions,
    experiences,
    hoursOfSleep,
    thoughts,
    mood
  });

  return res.json({ message: "New MoodEntry was created", moodEntry: moodEntry.toJSON() });
};

export default handleErrorMiddleware(add);
