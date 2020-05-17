import { Document, Model, model, Schema } from "mongoose";
import enums from "../data/enums.json";

const { mood, emotions } = enums;

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

const ExperienceSchema = new Schema({
  name: { type: String, required: true },
  positive: { type: Boolean, required: true }
});

const MoodEntrySchema = new Schema({
  entryId: { type: String, required: true },
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  emotions: {
    type: [
      {
        type: String,
        enum: emotions,
        required: true
      }
    ]
  },
  experiences: {
    type: [ExperienceSchema]
  },
  hoursOfSleep: { type: Number, required: true },
  mood: { type: String, required: true, enum: mood },
  thoughts: String
});

const MoodEntry: IMoodEntryModel = model<IMoodEntry, IMoodEntryModel>("MoodEntry", MoodEntrySchema);

export default MoodEntry;
