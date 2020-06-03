import { Document, Model, model, Schema } from "mongoose";

export interface ITask extends Document {
  taskId: string;
  userId: string;
  professionalId: string;
  title: string;
  description: string;
  completed: boolean;
  dateOfCompletion?: Date;
}

interface ITaskModel extends Model<ITask> {}

const TaskSchema = new Schema({
  taskId: { type: String, required: true },
  userId: { type: String, required: true },
  professionalId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false },
  dateOfCompletion: { type: Date }
});

const Task: ITaskModel = model<ITask, ITaskModel>("Task", TaskSchema);

export default Task;
