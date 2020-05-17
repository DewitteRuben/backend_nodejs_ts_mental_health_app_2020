import { RequestHandler } from "express";
import verifyTokenMiddleware from "./verify-token-middleware";
import { exists } from "../utils/user";
import { ApplicationError } from "../errors";

const userExistsMW: RequestHandler = async (req, res, next) => {
  const { userId } = req.body.auth;

  if (!userId) {
    throw new ApplicationError("No valid userId was found in the authorization header.");
  }

  const doesUserExist = await exists(userId);

  if (!doesUserExist) {
    throw new ApplicationError("No user was found that matches the userId", 401);
  }

  return next();
};

export default userExistsMW;
