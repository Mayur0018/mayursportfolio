import connectMongo from '../lib/mongodb';
import Experience from '../models/Experience';

export async function getExperiencesService() {
  await connectMongo();
  return Experience.find({}).sort({ order: 1 });
}

export async function createExperienceService(data: any) {
  await connectMongo();
  return Experience.create(data);
}

export async function updateExperienceService(id: string, data: any) {
  await connectMongo();
  return Experience.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteExperienceService(id: string) {
  await connectMongo();
  await Experience.findByIdAndDelete(id);
  return { message: 'Experience removed' };
}
