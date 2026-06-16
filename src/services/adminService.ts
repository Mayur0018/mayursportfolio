import connectMongo from '../lib/mongodb';
import User from '../models/User';
import Post from '../models/Post';
import Project from '../models/Project';

export async function getAnalyticsService() {
  await connectMongo();
  const [userCount, postCount, projectCount] = await Promise.all([
    User.countDocuments(),
    Post.countDocuments(),
    Project.countDocuments(),
  ]);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const newUsers = await User.countDocuments({ createdAt: { $gte: sevenDaysAgo } });
  return { totals: { users: userCount, posts: postCount, projects: projectCount }, newUsersLast7Days: newUsers };
}

export async function getAllUsersService() {
  await connectMongo();
  return User.find({}).select('-password').sort({ createdAt: -1 });
}
