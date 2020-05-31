import { RequestHandler } from "express";
import { v4 as uuid } from "uuid";
import handleErrorMiddleware from "../../middleware/handle-error-middleware";
import Professional from "../../models/Professional";
import { getMissingParamsMessage } from "../../utils/string";
import { ApplicationError } from "../../errors";
import { isISODate } from "../../utils/date";
import User, { IUser } from "../../models/User";
import { populateClientIds } from "../../utils/professional";

const registerUser: RequestHandler = async (req, res) => {
  const { professionalId } = req.body.auth;
  const { email, firstName, lastName, birthDate } = req.body;

  const params: { [key: string]: string } = { firstName, lastName, birthDate, email };
  const message = getMissingParamsMessage(params);
  if (message.length > 0 || !email || !firstName || !lastName || !birthDate) {
    throw new ApplicationError(`The request is missing the following parameters: ${message}`, 400);
  }

  if (birthDate && !isISODate(birthDate)) {
    throw new ApplicationError("Birth date should be a valid ISO8601 value.");
  }

  const userId = uuid();
  const user: IUser = {
    userId,
    email,
    firstName,
    lastName,
    birthDate: new Date(birthDate)
  };

  const createdUser = await User.create(user);

  const updatedDoc = await Professional.findOneAndUpdate(
    { professionalId },
    { $push: { clients: createdUser.userId } },
    { new: true }
  );

  const updatedProfessional = updatedDoc.toJSON();
  const populatedClients = await populateClientIds(updatedDoc.clients);

  updatedProfessional.clients = populatedClients;

  return res
    .json({
      message: "Successfully added new client to professional.",
      professional: updatedProfessional
    })
    .status(200);
};

export default handleErrorMiddleware(registerUser);
