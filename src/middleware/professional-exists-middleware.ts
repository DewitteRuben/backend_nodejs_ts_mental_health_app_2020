import { RequestHandler } from "express";
import { ApplicationError } from "../errors";
import { exists } from "../utils/professional";
import Professional from "../models/Professional";

const professionalExistsMiddleware: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body.auth;

  if (!email || !password) {
    throw new ApplicationError("No valid professional credentials were found in the authorization header.", 401);
  }

  const doesProfessionalExist = await exists(email);

  if (!doesProfessionalExist) {
    throw new ApplicationError("No professional was found that matches the credentials.", 401);
  }

  const professional = await Professional.findOne({ email });

  req.body.auth.professionalId = professional.professionalId;

  return next();
};

export default professionalExistsMiddleware;
