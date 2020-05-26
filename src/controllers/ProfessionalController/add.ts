import { RequestHandler } from "express";
import { v4 as uuid } from "uuid";
import handleErrorMiddleware from "../../middleware/handle-error-middleware";
import { getMissingParamsMessage } from "../../utils/string";
import { ApplicationError } from "../../errors";
import Professional from "../../models/Professional";
import { isISODate } from "../../utils/date";

const add: RequestHandler = async (req, res) => {
  const { email, firstName, lastName, password, birthDate } = req.body;

  const message = getMissingParamsMessage({ email, firstName, lastName, password, birthDate });
  if (message.length > 0 || !email || !firstName || !lastName || !password || birthDate) {
    throw new ApplicationError(`The following parameters are missing: ${message}`, 400);
  }

  if (!isISODate(birthDate)) {
    throw new ApplicationError("The supplied date is not of valid ISO8061 format.", 400);
  }

  const professionalId = uuid();
  const createdProfessional = await Professional.create({
    professionalId,
    email,
    firstName,
    lastName,
    password,
    birthDate: new Date(birthDate)
  });

  return res
    .json({ message: "Professional has been registered", professional: createdProfessional.toJSON() })
    .status(200);
};

export default handleErrorMiddleware(add);
