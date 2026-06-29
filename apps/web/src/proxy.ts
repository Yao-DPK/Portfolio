// apps/web/proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['fr', 'en'] as const;
const defaultLocale = 'fr' as const;
type Locale = (typeof locales)[number];

console.log('🔥 PROXY.TS CHARGÉ !');
console.log('📦 Locales supportées :', locales.join(', '));
console.log('📦 Locale par défaut :', defaultLocale);

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log(`🔵 Proxy exécuté pour : ${pathname}`);

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    console.log(`✅ Locale déjà présente, on laisse passer : ${pathname}`);
    return NextResponse.next();
  }

  const url = new URL(`/${defaultLocale}${pathname}`, request.url);
  console.log(`🔄 Redirection vers : ${url.toString()}`);
  return NextResponse.redirect(url);
}

// ✅ Configuration : ignorer les fichiers statiques, images, polices, etc.
export const config = {
  matcher: [
    // Exclure :
    // - API routes
    // - _next/static et _next/image (assets Next.js)
    // - favicon.ico
    // - .well-known
    // - Toutes les extensions de fichiers statiques courantes
    '/((?!api|_next/static|_next/image|favicon\\.ico|\\.well-known|.*\\.(?:jpg|jpeg|png|gif|svg|ico|webp|avif|css|js|json|xml|txt|pdf|docx?|xlsx?|pptx?|zip|rar|7z|mp4|mp3|wav|m4a|ttf|otf|woff|woff2|eot|map)).*)',
  ],
};