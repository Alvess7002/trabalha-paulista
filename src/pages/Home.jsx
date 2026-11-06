import { Link } from 'react-router-dom'
import { ArrowRight, Briefcase, GraduationCap, Store } from 'lucide-react'
import InfoCard from '../components/InfoCard'
import { useFeatures } from '../hooks/useFeatures'

const sections = [
  { icon: Briefcase, id: 's1', to: '/vagas' },
  { icon: GraduationCap, id: 's2', to: '/capacitacao' },
  { icon: Store, id: 's3', to: '/empreendedorismo' },
]

export default function Home() {
  const { t } = useFeatures()
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <span className="eyebrow">{t('home.eyebrow')}</span>
            <h1>{t('home.title')}</h1>
            <p>{t('home.text')}</p>
            <div className="hero-actions">
              <Link to="/vagas" className="btn btn-light">
                {t('home.explore')} <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/sobre" className="btn btn-outline-light">
                {t('home.know')}
              </Link>
            </div>
          </div>
          <div className="hero-panel" aria-hidden="true">
            <div><Briefcase size={22} /> {t('home.panel1')}</div>
            <div><GraduationCap size={22} /> {t('home.panel2')}</div>
            <div><Store size={22} /> {t('home.panel3')}</div>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <h2>{t('home.sectionTitle')}</h2>
          <p className="muted">{t('home.sectionSub')}</p>
        </div>
        <div className="grid">
          {sections.map((s) => (
            <InfoCard key={s.to} icon={s.icon} title={t(`home.${s.id}.title`)}
              description={t(`home.${s.id}.desc`)} to={s.to} linkLabel={t(`home.${s.id}.link`)} />
          ))}
        </div>
      </section>
    </>
  )
}
