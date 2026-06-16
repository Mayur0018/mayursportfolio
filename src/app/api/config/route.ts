import { NextRequest, NextResponse } from 'next/server';
import { getConfigService, updateConfigService } from '@/services/configService';
import { getUserFromRequest } from '@/lib/auth';

export async function GET() {
  try {
    const config = await getConfigService();
    return NextResponse.json(config);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user || user.role !== 'admin') return NextResponse.json({ message: 'Not authorized as an admin' }, { status: 401 });
  try {
    const body = await req.json();
    const updated = await updateConfigService(body);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
