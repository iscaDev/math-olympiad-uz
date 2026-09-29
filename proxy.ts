import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const headers=new Headers(request.headers);
  headers.delete('x-matholympiad-gateway');
  headers.delete('x-matholympiad-client-ip');
  const secret=process.env.BACKEND_PROXY_SECRET;
  if(secret)headers.set('x-matholympiad-gateway',secret);
  const clientIp=request.headers.get('x-vercel-forwarded-for')||request.headers.get('x-forwarded-for');
  if(clientIp)headers.set('x-matholympiad-client-ip',clientIp.split(',')[0]!.trim());
  return NextResponse.next({request:{headers}});
}

export const config={matcher:'/api/:path*'};
