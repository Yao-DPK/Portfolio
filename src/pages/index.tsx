import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Hero from "../components/Hero/Hero";
import SkillsPreview from "../components/Previews/SkillsPreview/SkillsPreview";
import ProjectsPreview from "../components/Previews/ProjectsPreviews/ProjectsPreview";
import ExperiencePreview from "../components/Previews/ExperiencePreview/ExperiencePreview";
import EducationPreview from "../components/Previews/EducationPreview/EducationPreview";
import ContactCTA from "../components/ContactCTA";
import Navbar, { Tab } from "@/components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";
import AboutPreview from "../components/Previews/AboutPreview/AboutPreview";
import CTAPreview from "@/components/Previews/CTAPreview/CTAPreview";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Correction : Typage explicite des variants avec Variants de Framer Motion
const sectionVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut" // "easeOut" est une chaîne valide dans Framer Motion
    }
  }
};

// Animated section wrapper avec le bon typage
const AnimatedSection = ({ children, id }: { children: React.ReactNode; id: string }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      id={id}
      className="section-frame"
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.section>
  );
};

export default function Home() {
  const [current, setCurrent] = useState<Tab>("about");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Pyke — Fullstack Engineer | Portfolio</title>
        <meta
          name="description"
          content="Pyke — Fullstack Engineer spécialisé en React, TypeScript et Node.js. Découvrez mes projets et mon parcours."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Pyke — Fullstack Engineer" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Portfolio professionnel d'un développeur fullstack passionné" />
        <meta name="theme-color" content="#6366f1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <Navbar current={current} scrolled={scrolled} />
      
      <main className="main-content">
        {/* Hero Section */}
        <div className="hero-wrapper">
          <Hero />
          <div className="scroll-indicator">
            <span>Scroll</span>
            <div className="scroll-line"></div>
          </div>
        </div>

        {/* Animated sections */}
        <AnimatedSection id="about">
          <AboutPreview />
        </AnimatedSection>

        <AnimatedSection id="skills">
          <SkillsPreview />
        </AnimatedSection>

        <AnimatedSection id="projects">
          <ProjectsPreview compact />
        </AnimatedSection>

        <AnimatedSection id="experience">
          <ExperiencePreview />
        </AnimatedSection>

        <AnimatedSection id="education">
          <EducationPreview />
        </AnimatedSection>

        <AnimatedSection id="contact">
          <CTAPreview />
        </AnimatedSection>
      </main>

      <Footer />
    </>
  );
}