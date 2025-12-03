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
import Footer from "../components/Footer";
import AboutPreview from "../components/Previews/AboutPreview/AboutPreview";


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
      
      <Head>
        <title>Pyke — Fullstack Engineer</title>
        <meta
          name="description"
          content="Pyke — Fullstack Engineer (React / TypeScript / Node). Portfolio & projects."
        />
      </Head>
      
      <Navbar current={current} />

      <main>
        {/* Hero */}
        <section style={{ padding: "64px 28px" }} className="section-frame">
          <Hero />
        </section>

        {/* About condensed */}
        <section id = "about"  style={{ padding: "36px 28px" }} className="section-frame">
          <AboutPreview />
        </section>

        {/* Skills preview */}
        <section id = "skills" style={{ padding: "36px 28px" }} className="section-frame">
          <SkillsPreview />
          <div style={{ marginTop: 12, textAlign: "right" }}>
            <Link href="/about" className="button">
              Voir toutes les compétences
            </Link>
          </div>
        </section>

        {/* Projects preview */}
        <section id = "projects" style={{ padding: "36px 28px" }} className="section-frame">
          <ProjectsPreview compact />
          <div style={{ marginTop: 12, textAlign: "right" }}>
            <Link href="/projects" className="button">
              Voir tous les projets
            </Link>
          </div>
        </section>

        {/* Experience preview */}
        <section id = "experience" style={{ padding: "36px 28px" }} className="section-frame">
          <ExperiencePreview />
          <div style={{ marginTop: 12, textAlign: "right" }}>
            <Link href="/experience" className="button">
              Voir l'expérience complète
            </Link>
          </div>
        </section>

        {/* Education preview */}
        <section id = "education" style={{ padding: "36px 28px" }} className="section-frame">
          <EducationPreview />
          <div style={{ marginTop: 12, textAlign: "right" }}>
            <Link href="/education" className="button">
              Détails formation
            </Link>
          </div>
        </section>

        {/* Contact CTA */}
        <section id = "contact" style={{ padding: "48px 28px" }} className="section-frame">
          <ContactCTA />
        </section>

        <Footer></Footer>
      </main>
    </>
  );
}
