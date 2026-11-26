import { Link } from 'react-router-dom'
import { ArrowRight, Briefcase, GraduationCap, Store } from 'lucide-react'
import InfoCard from '../components/InfoCard'
import { useIdioma } from '../idioma/useIdioma'

const sections = [
  {
    icon: Briefcase,
    titleKey: 'home.card1.title',
    textKey: 'home.card1.text',
    to: '/vagas',
    linkKey: 'home.card1.link',
  },
  {
    icon: GraduationCap,
    titleKey: 'home.card2.title',
    textKey: 'home.card2.text',
    to: '/capacitacao',
    linkKey: 'home.card2.link',
  },
  {
    icon: Store,
    titleKey: 'home.card3.title',
    textKey: 'home.card3.text',
    to: '/empreendedorismo',
    linkKey: 'home.card3.link',
  },
]

export default function Home() {
  const { t } = useIdioma()
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
                {t('home.exploreJobs')} <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/sobre" className="btn btn-outline-light">
                {t('home.learnMore')}
              </Link>
            </div>
          </div>
          <div className="hero-panel" aria-hidden="true">
            <div><Briefcase size={22} /> {t('home.panelJobs')}</div>
            <div><GraduationCap size={22} /> {t('home.panelCourses')}</div>
            <div><Store size={22} /> {t('home.panelBusiness')}</div>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <h2>{t('home.sectionTitle')}</h2>
          <p className="muted">{t('home.sectionSubtitle')}</p>
        </div>
        <div className="grid">
          {sections.map((s) => (
            <InfoCard
              key={s.to}
              icon={s.icon}
              title={t(s.titleKey)}
              description={t(s.textKey)}
              to={s.to}
              linkLabel={t(s.linkKey)}
            />
          ))}
        </div>
      </section>
    </>
  )
}
