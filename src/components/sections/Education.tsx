// src/components/sections/Education.tsx
import React from "react";
import { EducationCard } from "./EducationCard";
import { educations } from "@/data/education";

export const Education: React.FC = () => {
  return (
    <>
      {/* Header */}
      <div className="section-header">
        <h2 className="section-title">Formation</h2>
        <div className="muted">Parcours académique et certifications</div>
      </div>

      {/* Content */}
      <div className="section-content">
        <div
          className="cards"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
            marginTop: 12,
          }}
        >
          {educations.map((edu, idx) => (
            <EducationCard key={idx} edu={edu} />
          ))}
        </div>
      </div>
    </>
  );
};
