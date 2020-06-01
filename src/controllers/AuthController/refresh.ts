import { RequestHandler } from "express";
import _ from "lodash";
import handleErrorMiddleware from "../../middleware/handle-error-middleware";
import { verifyRefresh, sign } from "../../utils/jwt";
import { ApplicationError } from "../../errors";
import { getPrePopulatedProfessionalByEmail } from "../../utils/professional";

const refresh: RequestHandler = async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new ApplicationError("No refreshToken cookie was found", 400);
  }

  const { email, password } = <{ email: string; password: string }> await verifyRefresh(refreshToken);

  const professional = await getPrePopulatedProfessionalByEmail(email);

  const newAccessToken = await sign({ email, password });

  return res.json({ token: newAccessToken, professional });
};

export default handleErrorMiddleware(refresh);
