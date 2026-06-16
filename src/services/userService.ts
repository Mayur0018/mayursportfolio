import connectMongo from '../lib/mongodb';
import User from '../models/User';

export async function getUserProfileService(userId: string) {
  await connectMongo();
  return User.findById(userId).select('-password');
}

export async function updateUserProfileService(userId: string, data: any) {
  await connectMongo();
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  user.name = data.name || user.name;
  user.title = data.title || user.title;
  user.bio = data.bio || user.bio;
  user.skills = data.skills || user.skills;
  user.socials = data.socials || user.socials;
  if (data.avatar) user.avatar = data.avatar;
  await user.save();
  return user;
}
