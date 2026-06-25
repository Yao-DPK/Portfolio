// src/app/[locale]/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { locales } from '@/utils/i18n/config';
import '@/app/globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import I18nProvider from '@/components/I18nProvider';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
     <I18nProvider locale={locale as any}>
      {children}
    </I18nProvider>
  );
}