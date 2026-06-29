import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // ✅ Pour le déploiement sur Vercel

  // ✅ Pour les images distantes (si nécessaire)
  images: {
    domains: [],
    unoptimized: true, // ✅ Pour Vercel
  },

  // ✅ Pour les variables d'environnement
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // ✅ Experimental (si besoin)
  experimental: {
    // ...
  },
};

export default nextConfig;