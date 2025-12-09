import Link from 'next/link'

const AboutPreview = () => {
  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">À propos</h2>
        <div className="muted">Bref aperçu</div>
      </div>

      <div className="section-content" style={{ marginTop: 12 }}>
        <p className="muted" style={{ lineHeight: 1.55 }}>
          Salut — je suis <strong>Yao Konan</strong>, ingénieur logiciel spécialisé dans la conception
          d’interfaces réactives, l’architecture backend robuste et la création d’expériences fluides
          et élégantes. 
        </p>

        <p className="muted" style={{ marginTop: 10, lineHeight: 1.55 }}>
          J’aime comprendre comment un système fonctionne en profondeur, optimiser ce qui peut l’être
          et transformer des besoins complexes en solutions simples, efficaces et maintenables.
        </p>

        <p className="muted" style={{ marginTop: 10, lineHeight: 1.55 }}>
          Aujourd’hui, je travaille surtout sur{" "}
          <strong>React / Next.js</strong>, <strong>Node.js</strong> et les bases de données
          (<strong>PostgreSQL</strong>, <strong>MongoDB</strong>), avec un intérêt marqué pour
          le design system, le realtime et les architectures modulaires.
        </p>

        {/* OPTIONAL placeholders */}
        <p className="muted" style={{ marginTop: 10, lineHeight: 1.55 }}>
          {/* ➤ Remplace par ton ambition si tu veux */}
          <em>(Placeholder) Actuellement, je me concentre sur : XX — que ce soit pour apprendre,
          consolider ou approfondir mes compétences.</em>
        </p>

        <div style={{ marginTop: 16, textAlign: "right" }}>
          <Link href="/about" className="button">
            En savoir plus
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AboutPreview
