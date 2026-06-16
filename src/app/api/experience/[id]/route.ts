import { NextRequest, NextResponse } from 'next/server';
import { updateExperienceService, deleteExperienceService } from '@/services/experienceService';
import { getUserFromRequest } from '@/lib/auth';

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const user = await getUserFromRequest(req);
  if (!user || user.role !== 'admin') return NextResponse.json({ message: 'Not authorized as an admin' }, { status: 401 });
  try {
    const body = await req.json();
    const updated = await updateExperienceService(id, body);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const user = await getUserFromRequest(req);
  if (!user || user.role !== 'admin') return NextResponse.json({ message: 'Not authorized as an admin' }, { status: 401 });
  try {
    const res = await deleteExperienceService(id);
    return NextResponse.json(res);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
