import { NextRequest, NextResponse } from 'next/server';
import { getMessagesWithService } from '@/services/chatService';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
  try {
    const msgs = await getMessagesWithService(user._id.toString(), id);
    return NextResponse.json(msgs);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}


