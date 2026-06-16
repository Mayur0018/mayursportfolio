import { NextRequest, NextResponse } from 'next/server';
import { getPostsService, createPostService } from '@/services/postService';
import { getUserFromRequest } from '@/lib/auth';

export async function GET() {
  try {
    const posts = await getPostsService();
    return NextResponse.json(posts);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
  try {
    const body = await req.json();
    const post = await createPostService(user._id.toString(), body);
    return NextResponse.json(post, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
