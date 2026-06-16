import { NextRequest, NextResponse } from 'next/server';
import { getExperiencesService, ensureDefaultExperiences, createExperienceService } from '@/services/experienceService';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    let experiences = await getExperiencesService();
    if (!Array.isArray(experiences) || experiences.length === 0) {
      await ensureDefaultExperiences();
      experiences = await getExperiencesService();
    }
    return NextResponse.json(experiences);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user || user.role !== 'admin') return NextResponse.json({ message: 'Not authorized as an admin' }, { status: 401 });
  try {
    const body = await req.json();
    const exp = await createExperienceService(body);
    return NextResponse.json(exp, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
