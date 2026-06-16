import jwt from 'jsonwebtoken';
import connectMongo from './mongodb';
import User from '../models/User';

export async function getUserFromRequest(req: Request) {
  const authHeader = req.headers.get('authorization') || '';
  if (!authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];
  if (!token) return null;
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not defined');
  try {
    const decoded: any = jwt.verify(token, secret);
    await connectMongo();
    const user = await User.findById(decoded.id).select('-password');
    return user;
  } catch (err) {
    return null;
  }
}
