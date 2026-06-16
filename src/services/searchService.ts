import connectMongo from '../lib/mongodb';
import User from '../models/User';
import Post from '../models/Post';
import Project from '../models/Project';

export async function searchService(q: string) {
  await connectMongo();
  const regex = new RegExp(q, 'i');
  const users = await User.find({ $or: [{ name: regex }, { username: regex }, { title: regex }] }).select('name username title avatar');
  const posts = await Post.find({ content: regex }).populate('user', 'name username');
  const projects = await Project.find({ $or: [{ title: regex }, { description: regex }] });
  return { users, posts, projects };
}
