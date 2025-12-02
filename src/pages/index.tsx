// pages/index.tsx
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import Hero from "../components/Hero";
import SkillsPreview from "../components/Previews/SkillsPreview";
import ProjectsPreview from "../components/Previews/ProjectsPreview";
import ExperiencePreview from "../components/Previews/ExperiencePreview";
import EducationPreview from "../components/Previews/EducationPreview";
import ContactCTA from "../components/ContactCTA";
import Navbar, { Tab } from "@/components/Navbar";
import Footer from "@/components/Footer";


/* const IndexPage: React.FC = () => {
  const [current, setCurrent] = useState<Tab>("about");

  return (
    <div className="app-shell">
      <Navbar current={current} onChange={setCurrent} />
      <TabContainer current={current} />
    </div>
  );
};

export default IndexPage;
 */

export default function Home() {
  const [current, setCurrent] = useState<Tab>("about");
  return (
    <>
      <Navbar current={current} onChange={setCurrent} />
      <Head>
        <title>Pyke — Fullstack Engineer</title>
        <meta
          name="description"
          content="Pyke — Fullstack Engineer (React / TypeScript / Node). Portfolio & projects."
        />
      </Head>

      <main>
        {/* Hero */}
        <section style={{ padding: "64px 28px" }} className="section-frame">
          <Hero />
        </section>

        {/* About condensed */}
        <section style={{ padding: "36px 28px" }} className="section-frame">
          <div className="section theme-transition">
            <div className="section-header">
              <h2 className="section-title">À propos</h2>
              <div className="muted">Bref aperçu</div>
            </div>

            <div className="section-content" style={{ marginTop: 12 }}>
              <p className="muted">
                Bonjour — je suis <strong>Pyke</strong>, ingénieur logiciel spécialisé dans les interfaces réactives,
                les architectures robustes et les expériences utilisateur polies. J’aime le code propre, les transitions
                fluides et les systèmes scalables.
              </p>

              <div style={{ marginTop: 12, textAlign: "right" }}>
                <Link href="/about" className="button">
                  En savoir plus
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Skills preview */}
        <section style={{ padding: "36px 28px" }} className="section-frame">
          <SkillsPreview />
          <div style={{ marginTop: 12, textAlign: "right" }}>
            <Link href="/about" className="button">
              Voir toutes les compétences
            </Link>
          </div>
        </section>

        {/* Projects preview */}
        <section style={{ padding: "36px 28px" }} className="section-frame">
          <ProjectsPreview compact />
          <div style={{ marginTop: 12, textAlign: "right" }}>
            <Link href="/projects" className="button">
              Voir tous les projets
            </Link>
          </div>
        </section>

        {/* Experience preview */}
        <section style={{ padding: "36px 28px" }} className="section-frame">
          <ExperiencePreview />
          <div style={{ marginTop: 12, textAlign: "right" }}>
            <Link href="/experience" className="button">
              Voir l'expérience complète
            </Link>
          </div>
        </section>

        {/* Education preview */}
        <section style={{ padding: "36px 28px" }} className="section-frame">
          <EducationPreview />
          <div style={{ marginTop: 12, textAlign: "right" }}>
            <Link href="/education" className="button">
              Détails formation
            </Link>
          </div>
        </section>

        {/* Contact CTA */}
        <section style={{ padding: "48px 28px" }} className="section-frame">
          <ContactCTA />
        </section>

        <Footer></Footer>
      </main>
    </>
  );
}
