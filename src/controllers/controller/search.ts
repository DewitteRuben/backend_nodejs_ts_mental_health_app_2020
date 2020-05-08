import { RequestHandler } from "express";
import handleErrorMiddleware from "../../middleware/handle-error-middleware";

const get: RequestHandler = async (req, res) => {};

export default handleErrorMiddleware(get);
