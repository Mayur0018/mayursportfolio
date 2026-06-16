import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { getUserProfileService, updateUserProfileService } from '@/services/userService';

export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
  try {
    const profile = await getUserProfileService(user._id.toString());
    return NextResponse.json(profile);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
  try {
    const body = await req.json();
    const updated = await updateUserProfileService(user._id.toString(), body);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
