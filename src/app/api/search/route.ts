import { NextRequest, NextResponse } from 'next/server';
import { searchService } from '@/services/searchService';

export async function GET(req: NextRequest) {
  try {
    const q = req.nextUrl.searchParams.get('q') || '';
    const result = await searchService(q);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
