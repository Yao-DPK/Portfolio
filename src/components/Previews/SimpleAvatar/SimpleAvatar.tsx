import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./SimpleAvatar.module.css";

const SimpleAvatar: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      className={styles.avatarContainer}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        duration: 0.6, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
    >
      {/* Blur placeholder pendant le chargement */}
      {!imageLoaded && (
        <div className={styles.placeholder}>
          <div className={styles.placeholderInner} />
        </div>
      )}
      
      {/* Image avec Next.js Image pour optimisation */}
      <Image
        src="/assets/David .jpg"
        alt="Yao Konan - Fullstack Engineer"
        fill
        sizes="(max-width: 768px) 200px, (max-width: 1200px) 280px, 320px"
        className={`${styles.avatarImage} ${imageLoaded ? styles.loaded : ""}`}
        onLoadingComplete={() => setImageLoaded(true)}
        priority
        quality={90}
      />
      
      {/* Overlay gradient subtil */}
      <div className={styles.avatarOverlay} />
    </motion.div>
  );
};

export default SimpleAvatar;