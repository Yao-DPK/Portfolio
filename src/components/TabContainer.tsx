// src/components/TabContainer.tsx
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Tab } from "./NavBar/Navbar";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import { Education } from "./sections/Education";

interface TabContainerProps {
  current: Tab;
}

const variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 60 : -60,
    scale: 0.995,
  }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -60 : 60,
    scale: 0.995,
  }),
};

const TabContainer: React.FC<TabContainerProps> = ({ current }) => {
  // direction for subtle slide (we can compute from tab order)
  const order = ["about", "skills", "projects", "experience", "education", "contact"];
  const index = order.indexOf(current);
  const direction = index; // simple numeric direction for animations

  return (
    <main className="main-viewport">
      <div className="section-frame" aria-live="polite">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          {current === "about" && (
            <motion.section
              key="about"
              className="section"
              id="panel-about"
              role="tabpanel"
              aria-labelledby="tab-about"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45 }}
            >
              <About />
            </motion.section>
          )}

         

          {current === "skills" && (
            <motion.section
              key="skills"
              className="section"
              id="panel-skills"
              role="tabpanel"
              aria-labelledby="tab-skills"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45 }}
            >
              <Skills />
            </motion.section>
          )}

          {current === "projects" && (
            <motion.section
              key="projects"
              className="section"
              id="panel-projects"
              role="tabpanel"
              aria-labelledby="tab-projects"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45 }}
            >
              <Projects />
            </motion.section>
          )}

          {current === "experience" && (
            <motion.section
              key="experience"
              className="section"
              id="panel-experience"
              role="tabpanel"
              aria-labelledby="tab-experience"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45 }}
            >
              <Experience />
            </motion.section>
          )}

          {current === "education" && (
            <motion.section
              key="education"
              className="section"
              id="panel-education"
              role="tabpanel"
              aria-labelledby="tab-education"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45 }}
            >
              <Education />
            </motion.section>
          )}

          {current === "contact" && (
            <motion.section
              key="contact"
              className="section"
              id="panel-contact"
              role="tabpanel"
              aria-labelledby="tab-contact"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45 }}
            >
              <Contact />
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default TabContainer;
