import Link from 'next/link'
//import styles from './AboutPreview.css'

const AboutPreview = () => {
  return (
    <div className="section">
            <div className="section-header">
              <h2 className="section-title">À propos</h2>
              <div className="muted">Bref aperçu</div>
            </div>

            <div className="section-content" style={{ marginTop: 12 }}>
              <p className="muted">
                Bonjour — je suis <strong>Yao Konan</strong>, ingénieur logiciel spécialisé dans les interfaces réactives,
                les architectures robustes et les expériences utilisateur polies. J’aime le code propre, les transitions
                fluides et les systèmes scalables.
              </p>

              <div style={{ marginTop: 12, textAlign: "right" }}>
                <Link href="/about" className="button">
                  En savoir plus
                </Link>
              </div>
            </div>
          </div>
  )
}

export default AboutPreview

