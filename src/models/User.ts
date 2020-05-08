import { Document, Model, model, Schema } from "mongoose";

export interface IUser extends Document {
  userId: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
}

interface IUserModel extends Model<IUser> {}

const schema = new Schema({
  userId: { type: String, required: true },
  firstName: String,
  lastName: String,
  birthDate: Date
});

const User: IUserModel = model<IUser, IUserModel>("User", schema);

export default User;
