import { NextRequest, NextResponse } from 'next/server';
import { markNotificationReadService } from '@/services/notificationService';
import { getUserFromRequest } from '@/lib/auth';

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
  try {
    const updated = await markNotificationReadService(id);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: err.message === 'Notification not found' ? 404 : 500 });
  }
}


