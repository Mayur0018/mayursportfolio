import { NextRequest, NextResponse } from 'next/server';
import { getNotificationsService } from '@/services/notificationService';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
  try {
    const notifications = await getNotificationsService(user._id.toString());
    return NextResponse.json(notifications);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
