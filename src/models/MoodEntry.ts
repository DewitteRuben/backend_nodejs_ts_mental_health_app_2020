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

interface IMoodEntryModel extends Model<IMoodEntry> {}

const schema = new Schema({
  entryId: { type: String, required: true },
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  emotions: { type: [String], required: true },
  experiences: { type: [String], required: true },
  hoursOfSleep: { type: Number, required: true },
  mood: { type: String, required: true },
  thoughts: String
});

const MoodEntry: IMoodEntryModel = model<IMoodEntry, IMoodEntryModel>("MoodEntry", schema);

export default MoodEntry;
