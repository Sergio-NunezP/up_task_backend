import mongoose, { Document, Schema, Types } from "mongoose";

export interface ITask extends Document {
    name: string;
    description: string;
    project: Types.ObjectId;
}

export const TaskSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    project: {
        type: Types.ObjectId,
        ref: 'Project'
    }
})

const Task = mongoose.model<ITask>('Task', TaskSchema);
export default Task;