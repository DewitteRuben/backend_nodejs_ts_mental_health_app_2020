import { Document, Model, model, Schema, HookSyncCallback } from "mongoose";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

const saltRounds = 10;

export interface IProfessional {
  professionalId: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  password: string;
  birthDate: Date;
  compare: (password: string) => Promise<boolean>;
}

export interface IProfessionalDocument extends IProfessional, Document {}

interface IProfessionalModel extends Model<IProfessionalDocument> {}

const schema = new Schema<IProfessionalDocument>({
  professionalId: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  birthDate: { type: Date, required: true },
  clients: { type: [String], required: true, default: [] }
});

async function encryptPassword(this: IProfessionalDocument, next: any) {
  const { password } = this;
  if (!this.isNew) return next();

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  this.password = hashedPassword;
  return next();
}

schema.pre("save", encryptPassword);

schema.methods.compare = function (this: IProfessionalDocument, password: string) {
  return bcrypt.compare(password, this.password);
};

const Professional: IProfessionalModel = model<IProfessionalDocument, IProfessionalModel>("Professional", schema);

export default Professional;
