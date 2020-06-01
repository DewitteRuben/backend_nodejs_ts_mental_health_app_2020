import { RequestHandler } from "express";
import _ from "lodash";
import handleErrorMiddleware from "../../middleware/handle-error-middleware";
import Professional from "../../models/Professional";
import { ApplicationError } from "../../errors";
import { sign, signRefresh, verify } from "../../utils/jwt";
import { populateClientIds, populateProfessional } from "../../utils/professional";

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

  const populatedProfessional = await populateProfessional(professional);

  const token = await sign({ email, password });
  const refreshToken = await signRefresh({ email, password });

  res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 1209600000 }); // 14 days

  return res.json({ token, professional: populatedProfessional }).status(200);
};

export default handleErrorMiddleware(authProfessional);
