import moongose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
    projectName: string;
    clientName: string;
    description: string;
}

const ProjectSchema: Schema = new Schema({
    projectName: {
        type: String,
        required: true,
        trim: true
    },
    clientName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
})

const Project = moongose.model<IProject>('Project', ProjectSchema, 'projects');
export default Project;