import { RequestHandler } from "express";
import handleErrorMiddleware from "../../middleware/handle-error-middleware";
import { verifyRefresh, sign } from "../../utils/jwt";
import { ApplicationError } from "../../errors";

const refresh: RequestHandler = async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new ApplicationError("No refreshToken cookie was found", 400);
  }

  const { email, password } = <{ email: string; password: string }> await verifyRefresh(refreshToken);

  const newAccessToken = await sign({ email, password });

  return res.json({ token: newAccessToken });
};

export default handleErrorMiddleware(refresh);
