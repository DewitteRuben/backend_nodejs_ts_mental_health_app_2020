import { RequestHandler } from "express";
import handleErrorMiddleware from "../../middleware/handle-error-middleware";
import { sign } from "../../utils/jwt";
import { ApplicationError } from "../../errors";
import { exists } from "../../utils/user";

const auth: RequestHandler = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    throw new ApplicationError("Missing userId from request body.", 400);
  }

  const userExists = await exists(userId);

  if (!userExists) {
    throw new ApplicationError("No user was found that matches the userId", 401);
  }

  const token = await sign({ userId });

  return res.json({
    token
  }).status(200);
};

export default handleErrorMiddleware(auth);
