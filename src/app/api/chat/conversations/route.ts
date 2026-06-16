import { NextRequest, NextResponse } from 'next/server';
import { getConversationsService } from '@/services/chatService';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
  try {
    const conv = await getConversationsService(user._id.toString());
    return NextResponse.json(conv);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
