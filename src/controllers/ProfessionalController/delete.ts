import { RequestHandler } from "express";
import { ApplicationError } from "../../errors";
import Professional from "../../models/Professional";

const deleteHandler: RequestHandler = async (req, res, next) => {
  const { userId } = req.body;
  const { professionalId } = req.body.auth;

  if (!userId) {
    throw new ApplicationError("Missing userId parameter, please provide id of user to remove.", 400);
  }

  const professional = await Professional.updateOne({ professionalId }, { $pullAll: { clients: [userId] } });

  return res.json({ message: `Successfully removed client: '${userId}' from professional.` });
};

export default deleteHandler;
