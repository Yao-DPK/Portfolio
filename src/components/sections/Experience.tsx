// src/components/ExperienceSection.tsx
import React from "react";
import { experiences } from "../../data/experiences";
import ExperienceCard from "./ExperienceCard";

const Experience: React.FC = () => {
  return (
    <>
      <div className="section-header">
        <h2 className="section-title">Expérience</h2>
        <div className="muted">Mon parcours professionnel et mes missions clés</div>
      </div>

      <div className="section-content" style={{ marginTop: 12 }}>
        <div
          className="cards"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}
        >
          {experiences.map((exp, idx) => (
            <ExperienceCard key={idx} experience={exp} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Experience;
