import { NextRequest, NextResponse } from 'next/server';
import { Cities } from '../src/types/enums';

const exceptions = ['artists', 'auth', 'lama', 'user'];

export async function middleware(req: NextRequest) {
  const { nextUrl: url, ip } = req;

  if (url.pathname === '/') {
    url.pathname = `/${Cities.petersburg}`;
    return NextResponse.redirect(url, 302);
  }
}
