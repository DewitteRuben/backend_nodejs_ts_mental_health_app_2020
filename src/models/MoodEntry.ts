import { Document, Model, model, Schema } from "mongoose";

export interface IMoodEntry extends Document {
  entryId: string;
  userId: string;
  date: Date;
  emotions: string[];
  experiences: string[];
  hoursOfSleep: number;
  thoughts: string;
  weight: string;
}

interface IModel extends Model<IMoodEntry> {}

const schema = new Schema({
  entryId: { type: String, required: true },
  userId: { type: String, required: true },
  date: Date,
  emotions: Array,
  experiences: Array,
  hoursOfSleep: Number,
  mood: String,
  thoughts: String,
  weight: String
});

const MoodEntry: IModel = model<IMoodEntry, IModel>("MoodEntry", schema);

export default MoodEntry;
