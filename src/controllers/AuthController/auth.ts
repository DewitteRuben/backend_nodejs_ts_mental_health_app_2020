import { RequestHandler } from "express";
import handleErrorMiddleware from "../../middleware/handle-error-middleware";
import { sign, verify } from "../../utils/jwt";

const auth: RequestHandler = async (req, res) => {
  const { userId } = req.body;

  if (userId) {
    // check if user exists
  }

  const token = await sign({ userId });

  return res.json({
    token
  });
};

export default handleErrorMiddleware(auth);
