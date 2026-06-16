import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { getAllUsersService } from '@/services/adminService';

export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user || user.role !== 'admin') return NextResponse.json({ message: 'Not authorized as an admin' }, { status: 401 });
  try {
    const users = await getAllUsersService();
    return NextResponse.json(users);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
