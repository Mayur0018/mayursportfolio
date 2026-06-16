import connectMongo from '../lib/mongodb';
import Project from '../models/Project';

export async function getProjectsService() {
  await connectMongo();
  return Project.find({}).sort({ number: 1 });
}

export async function createProjectService(data: {
  number?: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  imagePosition?: string;
  liveUrl: string;
}) {
  await connectMongo();
  return Project.create({
    number: data.number || '00',
    title: data.title,
    description: data.description,
    imageSrc: data.imageSrc,
    imageAlt: data.imageAlt || data.title,
    imagePosition: data.imagePosition || 'left',
    liveUrl: data.liveUrl,
  });
}

export async function updateProjectService(id: string, data: Partial<{
  number: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition: string;
  liveUrl: string;
}>) {
  await connectMongo();
  const project = await Project.findById(id);
  if (!project) throw new Error('Project not found');
  project.number = data.number || project.number;
  project.title = data.title || project.title;
  project.description = data.description || project.description;
  project.imageSrc = data.imageSrc || project.imageSrc;
  project.imageAlt = data.imageAlt || project.imageAlt;
  project.imagePosition = data.imagePosition || project.imagePosition;
  project.liveUrl = data.liveUrl || project.liveUrl;
  return project.save();
}

export async function deleteProjectService(id: string) {
  await connectMongo();
  const project = await Project.findById(id);
  if (!project) throw new Error('Project not found');
  await project.deleteOne();
  return { message: 'Project removed' };
}
