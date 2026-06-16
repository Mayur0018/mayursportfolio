import connectMongo from '../lib/mongodb';
import Skill from '../models/Skill';

export async function getSkillsService() {
  await connectMongo();
  return Skill.find({}).sort({ order: 1 });
}

export async function createSkillService(data: any) {
  await connectMongo();
  return Skill.create(data);
}

export async function updateSkillService(id: string, data: any) {
  await connectMongo();
  return Skill.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteSkillService(id: string) {
  await connectMongo();
  await Skill.findByIdAndDelete(id);
  return { message: 'Skill removed' };
}
