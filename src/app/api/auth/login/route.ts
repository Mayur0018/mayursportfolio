import { NextResponse } from 'next/server';
import { authUserService } from '@/services/authService';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await authUserService(body);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Invalid credentials' }, { status: 401 });
  }
}
