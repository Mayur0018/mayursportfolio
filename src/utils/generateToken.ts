import jwt from 'jsonwebtoken';

export default function generateToken(id: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not defined');
  return jwt.sign({ id }, secret, { expiresIn: '30d' });
}
