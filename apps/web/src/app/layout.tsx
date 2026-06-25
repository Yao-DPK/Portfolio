// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import GridBackgroundWrapper from '@/components/GridBackgroundWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Yao Konan — Fullstack Engineer',
  description: 'Portfolio de Yao Konan, développeur fullstack',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        {/* ✅ Un seul background, fixé en arrière-plan */}
        <GridBackgroundWrapper />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}