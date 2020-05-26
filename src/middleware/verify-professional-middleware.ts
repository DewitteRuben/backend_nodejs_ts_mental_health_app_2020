import { RequestHandler } from "express";
import verifyTokenHandler from "./verify-token-middleware";
import verifyProfessionalFromToken from "./professional-exists-middleware";

export default [verifyTokenHandler, verifyProfessionalFromToken] as RequestHandler[];
