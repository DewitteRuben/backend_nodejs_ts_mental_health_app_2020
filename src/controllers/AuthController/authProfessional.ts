import { RequestHandler } from "express";
import handleErrorMiddleware from "../../middleware/handle-error-middleware";
import Professional from "../../models/Professional";
import { ApplicationError } from "../../errors";
import { sign } from "../../utils/jwt";

const authProfessional: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const exists = await Professional.exists({ email });

  if (!exists) {
    throw new ApplicationError("Login credentials are invalid or the requested user was not found", 401);
  }

  const professional = await Professional.findOne({ email });

  const isValidPassword = await professional.compare(password);
  if (!isValidPassword) {
    throw new ApplicationError("Login credentials are invalid or the requested user was not found", 401);
  }

  const token = sign({ email, password });

  return res.json({ token }).status(200);
};

export default handleErrorMiddleware(authProfessional);
