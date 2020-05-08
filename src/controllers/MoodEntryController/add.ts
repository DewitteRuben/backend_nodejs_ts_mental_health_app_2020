import { RequestHandler } from "express";
import handleErrorMiddleware from "../../middleware/handle-error-middleware";

const add: RequestHandler = async (req, res) => {};

export default handleErrorMiddleware(add);
