import { RequestHandler } from "express";
import { v4 as uuid } from "uuid";
import handleErrorMiddleware from "../../middleware/handle-error-middleware";
import Professional from "../../models/Professional";
import { getMissingParamsMessage } from "../../utils/string";
import { ApplicationError } from "../../errors";
import { isISODate } from "../../utils/date";
import User, { IUser } from "../../models/User";

const registerUser: RequestHandler = async (req, res) => {
  const { professionalId } = req.body.auth;
  const { firstName, lastName, birthDate } = req.body;

  if (!firstName || !lastName || !birthDate) {
    const params: { [key: string]: string } = { firstName, lastName, birthDate };
    const message = getMissingParamsMessage(params);
    throw new ApplicationError(`The request is missing the following parameters: ${message}`, 400);
  }

  if (birthDate && !isISODate(birthDate)) {
    throw new ApplicationError("Birth date should be a valid ISO8601 value.");
  }

  const userId = uuid();
  const user: IUser = {
    userId,
    firstName,
    lastName,
    birthDate: new Date(birthDate)
  };

  const createdUser = await User.create(user);

  const updatedDoc = await Professional.findOneAndUpdate(
    { professionalId },
    { $push: { clients: createdUser.userId } }
  );

  return res
    .json({
      message: "Successfully added new client to professional.",
      professional: updatedDoc.toJSON(),
      user: createdUser.toJSON()
    })
    .status(200);
};

export default handleErrorMiddleware(registerUser);
