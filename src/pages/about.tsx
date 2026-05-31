// pages/about.tsx ou app/about/page.tsx
import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import styles from "../styles/AboutPage.module.css";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Données pour le timeline slider
const timelineData = [
  {
    year: "2024",
    title: "🎯 En jeu actuellement",
    description: "Développement d'applications fullstack avec Next.js et NestJS",
    achievements: [
      "Architecture microservices",
      "Optimisation des performances",
      "Mentorat technique"
    ],
    tech: ["Next.js 14", "TypeScript", "NestJS", "PostgreSQL"],
    highlight: "Objectif : Devenir Lead Tech"
  },
  {
    year: "2023",
    title: "🏆 Saison de progression",
    description: "Spécialisation en architecture backend et bases de données",
    achievements: [
      "Certification AWS",
      "Projet e-commerce fullstack",
      "Contribution open source"
    ],
    tech: ["Node.js", "MongoDB", "Docker", "GraphQL"],
    highlight: "+300% de projets livrés"
  },
  {
    year: "2022",
    title: "🔥 Rookie de l'année",
    description: "Première expérience professionnelle significative",
    achievements: [
      "Application React pour startup",
      "Mise en place CI/CD",
      "Formation continue"
    ],
    tech: ["React", "Express", "MySQL", "GitHub Actions"],
    highlight: "Premier client satisfait"
  },
  {
    year: "2021",
    title: "📚 Entraînement intensif",
    description: "Formation approfondie et projets personnels",
    achievements: [
      "Maîtrise du JavaScript",
      "Projets personnels fullstack",
      "Veille technologique"
    ],
    tech: ["JavaScript", "React", "Node.js", "MongoDB"],
    highlight: "1000+ heures de code"
  },
  {
    year: "2020",
    title: "🏀 Début du match",
    description: "Premiers pas dans le développement web",
    achievements: [
      "Découverte du HTML/CSS",
      "Premiers projets frontend",
      "Communauté dev"
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Git"],
    highlight: "Le début d'une aventure"
  }
];

const AboutPage = () => {
  const [currentIndex, setCurrentIndex] = useState(2); // Index 2 = 2022 (milieu)
  const currentYear = timelineData[currentIndex];

  const nextYear = () => {
    if (currentIndex < timelineData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevYear = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
      <Head>
        <title>À propos | Yao Konan - Fullstack Engineer</title>
        <meta name="description" content="Découvrez mon parcours, mes stats et ma philosophie de développement." />
      </Head>

      <motion.div
        className={styles.aboutPage}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Section - Style affiche de match */}
        <section className={styles.hero}>
          <div className={styles.heroContainer}>
            <motion.div variants={itemVariants} className={styles.heroContent}>
              <div className={styles.jerseyNumber}>
                <span className={styles.number}>4</span>
                <span className={styles.years}>ans d'XP</span>
              </div>
              <h1 className={styles.title}>
                Yao <span className={styles.gradient}>Konan</span>
              </h1>
              <div className={styles.position}>
                <span className={styles.positionBadge}>🏀 FULLSTACK ENGINEER</span>
                <span className={styles.positionNumber}>#DEV</span>
              </div>
              <p className={styles.tagline}>
                "Je livre ce que vous demandez, comme vous l'imaginez,<br />
                avec la précision d'un shoot à 3 points."
              </p>
              <div className={styles.info}>
                <div className={styles.infoItem}>
                  <span>📍 Abidjan, Côte d'Ivoire</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.statusDot}></span>
                  <span>En jeu • Disponible</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className={styles.heroImage}>
              <div className={styles.courtBackground} />
              <div className={styles.imageWrapper}>
                <div className={styles.imageGlow} />
                <Image
                  src="/assets/David.jpg"
                  alt="Yao Konan"
                  width={380}
                  height={380}
                  className={styles.profileImage}
                />
                <div className={styles.actionLines} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Bio - Format Stats Sheet */}
        <section className={styles.statsSheet}>
          <div className={styles.container}>
            <motion.div variants={itemVariants} className={styles.statsCard}>
              <div className={styles.statsHeader}>
                <span className={styles.statsIcon}>📊</span>
                <h3>STATS TECHNIQUES</h3>
              </div>
              <div className={styles.statsGrid}>
                <div className={styles.statRow}>
                  <span className={styles.statLabel}>POSITION</span>
                  <span className={styles.statValue}>Fullstack Engineer</span>
                </div>
                <div className={styles.statRow}>
                  <span className={styles.statLabel}>TAILLE</span>
                  <span className={styles.statValue}>Solutions sur mesure</span>
                </div>
                <div className={styles.statRow}>
                  <span className={styles.statLabel}>NUMÉRO</span>
                  <span className={styles.statValue}>4 ans d'expérience</span>
                </div>
                <div className={styles.statRow}>
                  <span className={styles.statLabel}>SPÉCIALITÉ</span>
                  <span className={styles.statValue}>React • Node.js • TypeScript</span>
                </div>
                <div className={styles.statRow}>
                  <span className={styles.statLabel}>PALMARÈS</span>
                  <span className={styles.statValue}>15+ projets livrés</span>
                </div>
              </div>
              <p className={styles.statsQuote}>
                "Je transforme vos idées en solutions robustes. <br />
                Simple, efficace, comme un alley-oop parfait."
              </p>
            </motion.div>
          </div>
        </section>

        {/* Timeline Slider Vertical */}
        <section className={styles.timelineSlider}>
          <div className={styles.container}>
            <motion.div variants={itemVariants} className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>📅 MON PARCOURS</h2>
              <div className={styles.courtLines} />
            </motion.div>

            <div className={styles.sliderContainer}>
              {/* Années à gauche */}
              <div className={styles.yearsList}>
                {timelineData.map((item, idx) => (
                  <div
                    key={item.year}
                    className={`${styles.yearItem} ${idx === currentIndex ? styles.active : ""}`}
                    onClick={() => setCurrentIndex(idx)}
                  >
                    <span className={styles.yearNumber}>{item.year}</span>
                    {idx === currentIndex && <div className={styles.yearIndicator} />}
                  </div>
                ))}
              </div>

              {/* Contenu à droite avec animation type PowerPoint */}
              <div className={styles.contentArea}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentYear.year}
                    className={styles.timelineCard}
                    initial={{ opacity: 0, x: 50, rotateY: -10 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    exit={{ opacity: 0, x: -50, rotateY: 10 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className={styles.timelineHeader}>
                      <div className={styles.timelineIcon}>{currentYear.title.split(" ")[0]}</div>
                      <h3 className={styles.timelineTitle}>{currentYear.title}</h3>
                    </div>
                    <p className={styles.timelineDesc}>{currentYear.description}</p>

                    <div className={styles.achievements}>
                      <h4>🏆 RÉALISATIONS</h4>
                      <ul>
                        {currentYear.achievements.map((item) => (
                          <li key={item}>
                            <span className={styles.checkmark}>✓</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.techStack}>
                      <h4>⚙️ TECHNOLOGIES</h4>
                      <div className={styles.techTags}>
                        {currentYear.tech.map((tech) => (
                          <span key={tech} className={styles.techTag}>{tech}</span>
                        ))}
                      </div>
                    </div>

                    <div className={styles.highlight}>
                      <span className={styles.highlightIcon}>⭐</span>
                      <span>{currentYear.highlight}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Contrôles de navigation */}
                <div className={styles.sliderControls}>
                  <button
                    onClick={prevYear}
                    disabled={currentIndex === 0}
                    className={styles.controlBtn}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="18 15 12 9 6 15" />
                    </svg>
                  </button>
                  <button
                    onClick={nextYear}
                    disabled={currentIndex === timelineData.length - 1}
                    className={styles.controlBtn}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Game Plan - Valeurs */}
        <section className={styles.gamePlan}>
          <div className={styles.container}>
            <motion.div variants={itemVariants} className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>📋 GAME PLAN</h2>
              <div className={styles.courtLines} />
            </motion.div>

            <div className={styles.playbook}>
              <div className={styles.playCard}>
                <div className={styles.playIcon}>🎯</div>
                <div className={styles.playContent}>
                  <h3>QUALITÉ</h3>
                  <p>Code propre, testé, maintenable — pas de raccourcis</p>
                  <span className={styles.playTag}>"Shoot avec pourcentage"</span>
                </div>
              </div>
              <div className={styles.playCard}>
                <div className={styles.playIcon}>💡</div>
                <div className={styles.playContent}>
                  <h3>SIMPLICITÉ</h3>
                  <p>Ce que vous demandez, comme vous l'imaginez</p>
                  <span className={styles.playTag}>"Lecture du jeu"</span>
                </div>
              </div>
              <div className={styles.playCard}>
                <div className={styles.playIcon}>🤝</div>
                <div className={styles.playContent}>
                  <h3>ÉQUIPE</h3>
                  <p>Collaboration active, communication claire</p>
                  <span className={styles.playTag}>"Passe décisive"</span>
                </div>
              </div>
              <div className={styles.playCard}>
                <div className={styles.playIcon}>📚</div>
                <div className={styles.playContent}>
                  <h3>VEILLE</h3>
                  <p>Toujours apprendre, toujours progresser</p>
                  <span className={styles.playTag}>"Entraînement quotidien"</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Composition d'équipe - Compétences */}
        <section className={styles.teamRoster}>
          <div className={styles.container}>
            <motion.div variants={itemVariants} className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>🏀 COMPOSITION D'ÉQUIPE</h2>
              <div className={styles.courtLines} />
            </motion.div>

            <div className={styles.rosterGrid}>
              <div className={styles.playerCard}>
                <div className={styles.playerNumber}>MVP</div>
                <div className={styles.playerName}>React / Next.js</div>
                <div className={styles.playerRole}>⭐ Star Player</div>
                <div className={styles.playerStats}>
                  <div className={styles.statBar} style={{ width: "95%" }} />
                </div>
              </div>
              <div className={styles.playerCard}>
                <div className={styles.playerNumber}>Pivot</div>
                <div className={styles.playerName}>Node.js / NestJS</div>
                <div className={styles.playerRole}>🏆 Solide & Fiable</div>
                <div className={styles.playerStats}>
                  <div className={styles.statBar} style={{ width: "90%" }} />
                </div>
              </div>
              <div className={styles.playerCard}>
                <div className={styles.playerNumber}>Meneur</div>
                <div className={styles.playerName}>TypeScript</div>
                <div className={styles.playerRole}>🎯 Orchestrateur</div>
                <div className={styles.playerStats}>
                  <div className={styles.statBar} style={{ width: "92%" }} />
                </div>
              </div>
              <div className={styles.playerCard}>
                <div className={styles.playerNumber}>Ailier</div>
                <div className={styles.playerName}>PostgreSQL / MongoDB</div>
                <div className={styles.playerRole}>🔄 Polyvalent</div>
                <div className={styles.playerStats}>
                  <div className={styles.statBar} style={{ width: "85%" }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Intérêts - Hors terrain */}
        <section className={styles.interests}>
          <div className={styles.container}>
            <motion.div variants={itemVariants} className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>🎯 HORS TERRAIN</h2>
              <div className={styles.courtLines} />
            </motion.div>

            <div className={styles.interestsGrid}>
              <div className={styles.interestCard}>
                <div className={styles.interestIcon}>🏀</div>
                <h3>BASKET</h3>
                <p>Poste préféré : Meneur<br/>"Le collectif avant tout"</p>
              </div>
              <div className={styles.interestCard}>
                <div className={styles.interestIcon}>🎮</div>
                <h3>JEUX VIDÉOS</h3>
                <p>RPG / Stratégie<br/>"La réflexion stratégique"</p>
              </div>
              <div className={styles.interestCard}>
                <div className={styles.interestIcon}>🛋️</div>
                <h3>COSY MODE</h3>
                <p>Netflix & chill<br/>"L'équilibre est clé"</p>
              </div>
              <div className={styles.interestCard}>
                <div className={styles.interestIcon}>🔍</div>
                <h3>DÉCOUVERTE</h3>
                <p>Veille techno<br/>"Toujours en apprentissage"</p>
              </div>
            </div>
          </div>
        </section>

        {/* Fun Facts - Statistiques de match */}
        <section className={styles.funFacts}>
          <div className={styles.container}>
            <div className={styles.statsBoard}>
              <div className={styles.statBlock}>
                <div className={styles.statValue}>15+</div>
                <div className={styles.statLabel}>PROJETS RÉALISÉS</div>
              </div>
              <div className={styles.statBlock}>
                <div className={styles.statValue}>4</div>
                <div className={styles.statLabel}>ANNÉES D'XP</div>
              </div>
              <div className={styles.statBlock}>
                <div className={styles.statValue}>10+</div>
                <div className={styles.statLabel}>CLIENTS SATISFAITS</div>
              </div>
              <div className={styles.statBlock}>
                <div className={styles.statValue}>∞</div>
                <div className={styles.statLabel}>CAFÉS CONSOMMÉS</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA - Maillot */}
        <section className={styles.cta}>
          <div className={styles.container}>
            <motion.div variants={itemVariants} className={styles.jerseyCTA}>
              <div className={styles.jersey}>
                <div className={styles.jerseyNumber}>#DEV</div>
                <div className={styles.jerseyName}>KONAN</div>
              </div>
              <h2 className={styles.ctaTitle}>Recrutez-moi dans votre équipe</h2>
              <p className={styles.ctaText}>Prêt à entrer en jeu et faire gagner votre projet</p>
              <motion.a
                href="/contact"
                className={styles.ctaButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>🏀 Faites-moi entrer en jeu</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default AboutPage;