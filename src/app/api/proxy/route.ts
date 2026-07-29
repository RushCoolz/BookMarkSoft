import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*'
      }
    });

    if (!res.ok) {
      // Forward the error status
      return new NextResponse(await res.text(), {
        status: res.status,
        headers: { 'Content-Type': res.headers.get('content-type') || 'text/plain' }
      });
    }

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await res.json();
      return NextResponse.json(data);
    } else {
      const text = await res.text();
      return new NextResponse(text, {
        headers: { 'Content-Type': contentType || 'text/plain' }
      });
    }
  } catch (error: any) {
    console.error("Proxy fetch error:", error);
    return NextResponse.json({ error: 'Failed to fetch the requested resource', details: error.message }, { status: 500 });
  }
}
