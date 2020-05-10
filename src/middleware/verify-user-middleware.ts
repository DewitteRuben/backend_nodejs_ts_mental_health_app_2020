import { RequestHandler } from "express";
import verifyTokenHandler from "./verify-token-middleware";
import verifyUserFromToken from "./user-exists-middleware";

export default [verifyTokenHandler, verifyUserFromToken] as RequestHandler[];
