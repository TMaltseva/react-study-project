import { NextResponse } from 'next/server';
import { api } from '../../services/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const result = await api.endpoints.fetchPeople.initiate({ searchTerm, page });
  if ('data' in result) {
    return NextResponse.json(result.data);
  } else {
    return NextResponse.json({ error: 'Data not found' });
  }
}
