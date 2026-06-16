import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    number: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageSrc: { type: String, required: true },
    imageAlt: { type: String, required: true },
    imagePosition: { type: String, enum: ['left', 'right'], default: 'left' },
    liveUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
export default Project;
