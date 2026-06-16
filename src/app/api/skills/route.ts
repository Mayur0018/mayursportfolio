import { NextRequest, NextResponse } from 'next/server';
import { getSkillsService, createSkillService } from '@/services/skillService';
import { getUserFromRequest } from '@/lib/auth';

export async function GET() {
  try {
    const skills = await getSkillsService();
    return NextResponse.json(skills);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user || user.role !== 'admin') return NextResponse.json({ message: 'Not authorized as an admin' }, { status: 401 });
  try {
    const body = await req.json();
    const skill = await createSkillService(body);
    return NextResponse.json(skill, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
