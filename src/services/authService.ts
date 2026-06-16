import connectMongo from '../lib/mongodb';
import User from '../models/User';
import generateToken from '../utils/generateToken';

export async function registerUserService({ name, username, email, password }: { name: string; username: string; email: string; password: string; }) {
  await connectMongo();
  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  if (userExists) {
    throw new Error('User already exists');
  }
  const user = await User.create({ name, username, email, password });
  if (!user) throw new Error('Invalid user data');
  return {
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
    token: generateToken(user._id.toString()),
  };
}

export async function authUserService({ email, password }: { email: string; password: string; }) {
  await connectMongo();
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    return {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id.toString()),
    };
  }
  throw new Error('Invalid email or password');
}
