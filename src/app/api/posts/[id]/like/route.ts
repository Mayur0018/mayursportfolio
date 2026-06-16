import { NextRequest, NextResponse } from 'next/server';
import { likePostService } from '@/services/postService';
import { getUserFromRequest } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
  try {
    const post = await likePostService(params.id, user._id.toString());
    return NextResponse.json(post);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: err.message === 'Post not found' ? 404 : 500 });
  }
}
