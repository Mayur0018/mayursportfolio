
import { NextRequest, NextResponse } from 'next/server';
import { updateProjectService, deleteProjectService } from '@/services/projectService';
import { getUserFromRequest } from '@/lib/auth';

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const user = await getUserFromRequest(req);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ message: 'Not authorized as an admin' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const project = await updateProjectService(id, body);
    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: error.message === 'Project not found' ? 404 : 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const user = await getUserFromRequest(req);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ message: 'Not authorized as an admin' }, { status: 401 });
  }
  try {
    const result = await deleteProjectService(id);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: error.message === 'Project not found' ? 404 : 500 });
  }
}
