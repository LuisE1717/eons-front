// middleware.ts - MEJORADO
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

// Configuración de CORS para API routes
const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-Timezone, X-Device-Id, User-Agent',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Expose-Headers': 'Authorization, X-Request-Id',
};

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  
  console.log(`🛡️ Middleware - Path: ${pathname}, Has Token: ${!!token}`);

  // 🔧 CONFIGURACIÓN CORS PARA API ROUTES
  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    
    // Agregar headers CORS
    Object.entries(corsOptions).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    // Manejar preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { 
        status: 200, 
        headers: corsOptions 
      });
    }

    return response;
  }

  // 🔐 PROTECCIÓN DE RUTAS
  const isAuthPage = pathname.startsWith('/auth');
  const isPublicPage = pathname === '/' || pathname.startsWith('/public');
  const isVerificationPage = pathname.startsWith('/auth/email-verification') || 
                           pathname.startsWith('/auth/verification-success');

  // Redirigir usuarios autenticados lejos de páginas de auth
  if (token && isAuthPage && !isVerificationPage) {
    console.log('📍 Redirecting authenticated user away from auth page');
    return NextResponse.redirect(new URL('/services', request.url));
  }

  // Proteger rutas que requieren autenticación
  if (!token && !isAuthPage && !isPublicPage && !isVerificationPage) {
    console.log('🔒 Redirecting unauthenticated user to login');
    const loginUrl = new URL('/auth', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  // 🔄 MANEJO ESPECIAL: Si el usuario no tiene email verificado, redirigir a verificación
  if (token && !token.isEmailVerified && !isVerificationPage && !isAuthPage) {
    console.log('📧 User not verified, redirecting to verification');
    const verificationUrl = new URL('/auth/email-verification', request.url);
    verificationUrl.searchParams.set('email', token.email || '');
    verificationUrl.searchParams.set('fromLogin', 'true');
    return NextResponse.redirect(verificationUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};