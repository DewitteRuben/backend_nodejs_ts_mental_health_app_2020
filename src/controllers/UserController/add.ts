import { RequestHandler } from "express";
import { Request, ParamsDictionary } from "express-serve-static-core";
import { v4 as uuidv4 } from "uuid";
import handleErrorMiddleware from "../../middleware/handle-error-middleware";
import { isISODate } from "../../utils/date";
import { ApplicationError } from "../../errors";
import User, { IUser } from "../../models/User";
import { getMissingParamsMessage } from "../../utils/string";

type PartialUserStringified = Partial<Omit<IUser, "birthDate" | "userId"> & { birthDate: string }>;

const add: RequestHandler = async (req: Request<any, any, PartialUserStringified>, res) => {
  const { firstName, lastName, birthDate, email } = req.body;

  const params: { [key: string]: string } = { firstName, lastName, birthDate, email };
  const message = getMissingParamsMessage(params);
  if (message.length > 0 || !firstName || !lastName || !birthDate || !email) {
    throw new ApplicationError(`The request is missing the following parameters: ${message}`, 400);
  }

  if (birthDate && !isISODate(birthDate)) {
    throw new ApplicationError("Birth date should be a valid ISO8601 value.");
  }

  const userId = uuidv4();
  const user: IUser = {
    email,
    userId,
    firstName,
    lastName,
    birthDate: new Date(birthDate)
  };

  const createdUser = await User.create(user);

  return res.json({ user: createdUser }).status(200);
};

export default handleErrorMiddleware(add);
