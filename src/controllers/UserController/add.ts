import { RequestHandler } from "express";
import { Request, ParamsDictionary } from "express-serve-static-core";
import { v4 as uuidv4 } from "uuid";
import handleErrorMiddleware from "../../middleware/handle-error-middleware";
import { isISODate } from "../../utils/date";
import { ApplicationError } from "../../errors";
import User, { IUser } from "../../models/User";

type PartialUserStringified = Partial<Omit<IUser, "birthDate" | "userId"> & { birthDate: string }>;

const add: RequestHandler = async (req: Request<any, any, PartialUserStringified>, res) => {
  const { firstName, lastName, birthDate } = req.body;

  if (!firstName || !lastName || !birthDate) {
    const params: { [key: string]: string } = { firstName, lastName, birthDate };
    const missingParamsMessage = Object.keys(params)
      .map((key) => (!params[key] ? key : undefined))
      .filter((param) => param)
      .join(",");
    throw new ApplicationError(`The request is misisng the following parameters: ${missingParamsMessage}`, 400);
  }

  if (birthDate && !isISODate(birthDate)) {
    throw new ApplicationError("Birth date should be a valid ISO8601 value.");
  }

  const userId = uuidv4();
  const user: Partial<IUser> = {
    userId,
    firstName,
    lastName,
    birthDate: new Date(birthDate)
  };

  const createdUser = await User.create(user);

  return res.json({ user: createdUser }).status(200);
};

export default handleErrorMiddleware(add);
