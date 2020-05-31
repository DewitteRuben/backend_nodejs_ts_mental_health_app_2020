import Professional from "../models/Professional";
import User from "../models/User";

const exists = async (email: string) => Professional.exists({ email });

const populateClientIds = async (clients: string[]) => {
  const clientDetails = await User.find().where("userId").in(clients).exec();
  return clientDetails.map((user) => user.toJSON());
};

export { exists, populateClientIds };
