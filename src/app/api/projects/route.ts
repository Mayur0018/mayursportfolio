import { NextRequest, NextResponse } from 'next/server';
import { getProjectsService, createProjectService } from '@/services/projectService';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const projects = await getProjectsService();
    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ message: 'Not authorized as an admin' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const project = await createProjectService(body);
    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
