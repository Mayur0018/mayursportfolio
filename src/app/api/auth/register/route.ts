import { NextResponse } from 'next/server';
import { registerUserService } from '../../../../../src/services/authService';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await registerUserService(body);
    return NextResponse.json(result, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Server Error' }, { status: 400 });
  }
}
