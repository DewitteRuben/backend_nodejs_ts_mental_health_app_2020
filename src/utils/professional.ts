import _ from "lodash";
import Professional, { IProfessionalDocument } from "../models/Professional";
import User from "../models/User";

const exists = async (email: string) => Professional.exists({ email });

const populateClientIds = async (clients: string[]) => {
  const clientDetails = await User.find().where("userId").in(clients).exec();
  return clientDetails.map((user) => user.toJSON());
};

const populateProfessional = async (professional: IProfessionalDocument) => {
  const { clients } = professional;

  const populatedClients = await populateClientIds(clients);

  const filteredProfessional = _.omit(professional.toJSON(), "password");

  filteredProfessional.clients = populatedClients;
  return filteredProfessional;
};

const getPrePopulatedProfessionalByEmail = async (email: string) => {
  const professional = await Professional.findOne({ email });
  return populateProfessional(professional);
};

export { exists, populateClientIds, populateProfessional, getPrePopulatedProfessionalByEmail };
