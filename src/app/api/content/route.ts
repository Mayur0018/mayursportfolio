import { NextRequest, NextResponse } from 'next/server';
import { getAllContentService, createContentService } from '@/services/contentService';
import { getUserFromRequest } from '@/lib/auth';

export async function GET() {
  try {
    const content = await getAllContentService();
    return NextResponse.json(content);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user || user.role !== 'admin') return NextResponse.json({ message: 'Not authorized as an admin' }, { status: 401 });
  try {
    const body = await req.json();
    const created = await createContentService(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
