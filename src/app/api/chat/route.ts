import { NextRequest, NextResponse } from 'next/server';
import { sendMessageService } from '@/services/chatService';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
  try {
    const body = await req.json();
    const { receiverId, content } = body;
    const msg = await sendMessageService(user._id.toString(), receiverId, content);
    return NextResponse.json(msg, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
