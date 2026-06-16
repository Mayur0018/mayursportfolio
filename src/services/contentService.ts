import connectMongo from '../lib/mongodb';
import Content from '../models/Content';

export async function getAllContentService() {
  await connectMongo();
  return Content.find({}).sort({ date: -1, order: 1 });
}

export async function createContentService(data: any) {
  await connectMongo();
  return Content.create(data);
}

export async function updateContentService(id: string, data: any) {
  await connectMongo();
  return Content.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteContentService(id: string) {
  await connectMongo();
  await Content.findByIdAndDelete(id);
  return { message: 'Content removed' };
}
