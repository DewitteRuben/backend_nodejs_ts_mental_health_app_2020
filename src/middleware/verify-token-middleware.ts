import { RequestHandler } from "express";
import { verify } from "../utils/jwt";
import handleErrorMiddleware from "./handle-error-middleware";

const verifyTokenMW: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.includes("Bearer")) {
    throw new Error("Auth header is missing or malformed.");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new Error("Token is missing from header.");
  }

  const decodedToken = await verify(token) as { [key: string]: string };
  delete decodedToken.iat;

  req.body = { ...req.body, auth: decodedToken };
  next();
};

export default handleErrorMiddleware(verifyTokenMW);
