import { Document, Model, model, Schema } from "mongoose";

export interface IItem extends Document {
  name: string;
}

interface IModel extends Model<IItem> {}

const schema = new Schema({
  name: { type: String, required: true },
  author: { type: String, required: true }
});

const Item: IModel = model<IItem, IModel>("Item", schema);

export default Item;
