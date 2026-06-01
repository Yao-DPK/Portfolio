import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import styles from './AboutPreview.module.css';

const AboutPreview = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const stats = [
    { value: "2+", label: "Années d'expérience" },
    { value: "5+", label: "Projets réalisés" },
    //{ value: "10+", label: "Clients satisfaits" },
  ];

  return (
    <motion.div
      className={styles.aboutContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className={styles.header}>
        <motion.div variants={itemVariants} className={styles.badge}>
          <span className={styles.badgeText}>Qui suis-je ?</span>
        </motion.div>
        
        <motion.h2 variants={itemVariants} className={styles.title}>
          À propos de moi
        </motion.h2>
        
        <motion.div variants={itemVariants} className={styles.titleUnderline} />
      </div>

      <div className={styles.content}>
        <motion.div variants={itemVariants} className={styles.textContent}>
          <p className={styles.paragraph}>
            Salut — je suis <strong className={styles.highlight}>Yao Konan</strong>, ingénieur logiciel passionné par la conception
            d’interfaces réactives, l’architecture backend robuste et la création d’expériences fluides
            et élégantes.
          </p>

          <p className={styles.paragraph}>
            J’aime comprendre comment un système fonctionne en profondeur, optimiser ce qui peut l’être
            et transformer des besoins complexes en solutions simples, efficaces et maintenables.
          </p>

          <p className={styles.paragraph}>
            Aujourd’hui, je travaille surtout sur{" "}
            <strong className={styles.highlight}>React / Next.js</strong>,{" "}
            <strong className={styles.highlight}>Nest.js</strong> et les bases de données
            (<strong className={styles.highlight}>PostgreSQL</strong>,{" "}
            <strong className={styles.highlight}>MySQL</strong>), avec un intérêt marqué pour
            le design system, le realtime et les architectures modulaires.
          </p>
        </motion.div>

        {/* Stats section */}
        <motion.div variants={itemVariants} className={styles.statsContainer}>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={styles.statCard}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        {/* <motion.div variants={itemVariants} className={styles.ctaWrapper}>
          <Link href="/about" className={styles.button}>
            <span>En savoir plus</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </motion.div> */}
      </div>
    </motion.div>
  );
};

export default AboutPreview;