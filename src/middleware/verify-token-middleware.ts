import { RequestHandler } from "express";
import { verify } from "../utils/jwt";
import handleErrorMiddleware from "./handle-error-middleware";
import { ApplicationError } from "../errors";

const verifyTokenMW: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.includes("Bearer")) {
    throw new ApplicationError("Auth header is missing or malformed.", 400);
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new ApplicationError("Token is missing from header.", 400);
  }

  const decodedPayload = (await verify(token)) as { [key: string]: string };
  delete decodedPayload.iat;

  req.body = { ...req.body, auth: decodedPayload };
  next();
};

export default handleErrorMiddleware(verifyTokenMW);
