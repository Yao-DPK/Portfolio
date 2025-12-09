// pages/index.tsx
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import Hero from "../components/Hero/Hero";
import SkillsPreview from "../components/Previews/SkillsPreview/SkillsPreview";
import ProjectsPreview from "../components/Previews/ProjectsPreviews/ProjectsPreview";
import ExperiencePreview from "../components/Previews/ExperiencePreview/ExperiencePreview";
import EducationPreview from "../components/Previews/EducationPreview/EducationPreview";
import ContactCTA from "../components/ContactCTA";
import Navbar, { Tab } from "@/components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";
import AboutPreview from "../components/Previews/AboutPreview/AboutPreview";
import Sidebar from "@/components/Sidebar/Sidebar";
import CTAPreview from "@/components/Previews/CTAPreview/CTAPreview";


export default function Home() {
  const [current, setCurrent] = useState<Tab>("about");
  const [isClosed, setIsClosed] = useState(false);

  
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
        {/* <Sidebar/> */}
        <main>
        
          {/* Hero */}
          <section className="section-frame">
            <Hero />
          </section>

          {/* About condensed */}
          <section id = "about" className="section-frame">
            <AboutPreview />
          </section>

          {/* Skills preview */}
          <section id = "skills" className="section-frame">
            <SkillsPreview />
            
          </section>

          {/* Projects preview */}
          <section id = "projects" className="section-frame">
            <ProjectsPreview compact />
            
          </section>

          {/* Experience preview */}
          <section id = "experience" className="section-frame">
            <ExperiencePreview />
            
          </section>

          {/* Education preview */}
          <section id = "education" className="section-frame">
            <EducationPreview />
            
          </section>

          {/* Contact CTA */}
          <section id = "contact" className="section-frame">
            <CTAPreview />
          </section>

          
        </main>
      <Footer></Footer>
    </>
  );
}
