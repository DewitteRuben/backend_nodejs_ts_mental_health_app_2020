import { RequestHandler } from "express";
import handleErrorMiddleware from "../../middleware/handle-error-middleware";

const all: RequestHandler = async (req, res) => {};

export default handleErrorMiddleware(all);
