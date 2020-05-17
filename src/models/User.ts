import { Document, Model, model, Schema } from "mongoose";

export interface IUser {
  userId: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
}

export interface IUserDocument extends IUser, Document {}

interface IUserModel extends Model<IUserDocument> {}

const schema = new Schema({
  userId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true }
});

const User: IUserModel = model<IUserDocument, IUserModel>("User", schema);

export default User;
