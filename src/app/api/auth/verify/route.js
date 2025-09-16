import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    
    // For demo purposes, accept any non-empty token
    // In production, you would verify the JWT token here
    if (token && token.length > 0) {
      return NextResponse.json({ 
        valid: true, 
        user: { role: 'user' },
        message: 'Token is valid' 
      });
    } else {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json({ error: 'Token verification failed' }, { status: 500 });
  }
}
