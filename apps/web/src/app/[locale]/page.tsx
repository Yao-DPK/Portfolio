// src/app/[locale]/page.tsx
'use client';

import { ThemeToggle } from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import HeroPreview from '@/components/sections/previews/HeroPreview';
import TechnologiesPreview from '@/components/sections/previews/TechnologiesPreview';
import ExperiencePreview from '@/components/sections/previews/ExperiencePreview';
import ProjectsPreview from '@/components/sections/projects/ProjectsPreview';
import ContactPreview from '@/components/sections/previews/ContactPreview'; // ✅ Nouvel import
import VisitorCounter from '@/components/VisitorCounter';
import FooterPreview from '@/components/sections/previews/FooterPreview';
import EducationPreview from '@/components/sections/previews/EducationPreview';

export default function Home() {
  return (
    <div className="relative min-h-screen transition-colors duration-300">
      {/* Navigation */}
      <nav className="relative z-50 fixed top-0 left-0 right-0 bg-[var(--card-background)]/80 backdrop-blur-sm border-b border-[var(--card-border)] transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-bold text-[var(--foreground)]">
            <span className="text-[var(--accent)]">Y</span>ao Konan.
          </span>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        
        
        <HeroPreview />
        
        <section id="technologies" className="max-w-4xl mx-auto px-6 py-16">
          <TechnologiesPreview />
        </section>

        <section id="experience" className="max-w-4xl mx-auto px-6 py-16">
          <ExperiencePreview />
        </section>
        
        <section id="education" className="max-w-4xl mx-auto px-6 py-16">
          <EducationPreview /> 
        </section>

        <section id="projects" className="max-w-4xl mx-auto px-6 py-16">
          <ProjectsPreview />
        </section>

        <section id="contact" className="max-w-4xl mx-auto px-6 py-16">
          <ContactPreview /> 
        </section>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-[var(--card-background)]/50 backdrop-blur-sm rounded-2xl p-6 border border-[var(--card-border)] transition-colors duration-300">
            <VisitorCounter variant="compact" />
          </div>
        </div>
        <FooterPreview />
      </main>
    </div>
  );
}