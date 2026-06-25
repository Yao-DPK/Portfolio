// apps/web/proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ✅ Définition directe des locales dans le fichier proxy
// (pour éviter les problèmes d'import avec @/ qui ne fonctionnent pas dans le middleware)
const locales = ['fr', 'en'] as const;
const defaultLocale = 'fr' as const;
type Locale = (typeof locales)[number];

// 🔥 Log de chargement (visible au démarrage du serveur)
console.log('🔥 PROXY.TS CHARGÉ !');
console.log('📦 Locales supportées :', locales.join(', '));
console.log('📦 Locale par défaut :', defaultLocale);

export function proxy(request: NextRequest) {
  // 📝 Log de la requête (visible à chaque appel)
  console.log(`🔵 Proxy exécuté pour : ${request.nextUrl.pathname}`);

  const pathname = request.nextUrl.pathname;

  // Vérifier si le chemin contient déjà une locale valide
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // ✅ Si une locale est déjà présente, on laisse passer
  if (pathnameHasLocale) {
    console.log(`✅ Locale déjà présente, on laisse passer : ${pathname}`);
    return NextResponse.next();
  }

  // ❌ Sinon, on redirige vers la locale par défaut
  const url = new URL(`/${defaultLocale}${pathname}`, request.url);
  console.log(`🔄 Redirection vers : ${url.toString()}`);
  return NextResponse.redirect(url);
}

// ⚙️ Configuration : sur quelles routes le proxy s'exécute
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.svg|.*\\.ico).*)',
  ],
};