import { Link } from 'react-router-dom'
import { ArrowRight, Briefcase, GraduationCap, MapPin, Store } from 'lucide-react'
import InfoCard from '../components/InfoCard'
import { useIdioma } from '../idioma/useIdioma'

const sections = [
  {
    icon: Briefcase,
    titleKey: 'home.card1.title',
    textKey: 'home.card1.text',
    to: '/vagas',
    linkKey: 'home.card1.link',
    labelKey: 'home.path1Label',
    className: 'path-card path-card-jobs',
  },
  {
    icon: GraduationCap,
    titleKey: 'home.card2.title',
    textKey: 'home.card2.text',
    to: '/capacitacao',
    linkKey: 'home.card2.link',
    labelKey: 'home.path2Label',
    className: 'path-card path-card-courses',
  },
  {
    icon: Store,
    titleKey: 'home.card3.title',
    textKey: 'home.card3.text',
    to: '/empreendedorismo',
    linkKey: 'home.card3.link',
    labelKey: 'home.path3Label',
    className: 'path-card path-card-business',
  },
]

export default function Home() {
  const { t } = useIdioma()

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow"><MapPin size={14} aria-hidden="true" /> {t('home.eyebrow')}</span>
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
            <p className="hero-note">{t('home.heroNote')}</p>
          </div>
          <div className="hero-panel" aria-label={t('home.panelLabel')}>
            <div className="hero-panel-heading">
              <span className="hero-panel-dot" aria-hidden="true" />
              <span>{t('home.panelLabel')}</span>
            </div>
            <div className="hero-panel-item"><Briefcase size={20} aria-hidden="true" /><span>{t('home.panelJobs')}</span><strong>01</strong></div>
            <div className="hero-panel-item"><GraduationCap size={20} aria-hidden="true" /><span>{t('home.panelCourses')}</span><strong>02</strong></div>
            <div className="hero-panel-item"><Store size={20} aria-hidden="true" /><span>{t('home.panelBusiness')}</span><strong>03</strong></div>
          </div>
        </div>
      </section>

      <section className="container section path-section">
        <div className="section-head section-head-wide">
          <div>
            <span className="section-kicker">{t('home.startKicker')}</span>
            <h2>{t('home.startTitle')}</h2>
          </div>
          <p className="muted">{t('home.startSubtitle')}</p>
        </div>
        <div className="grid path-grid">
          {sections.map((section, index) => (
            <InfoCard
              key={section.to}
              icon={section.icon}
              badge={`0${index + 1} · ${t(section.labelKey)}`}
              title={t(section.titleKey)}
              description={t(section.textKey)}
              to={section.to}
              linkLabel={t(section.linkKey)}
              className={section.className}
            />
          ))}
        </div>
      </section>

      <section className="local-promise">
        <div className="container local-promise-inner">
          <div>
            <span className="section-kicker">{t('home.localKicker')}</span>
            <h2>{t('home.localTitle')}</h2>
            <p>{t('home.localText')}</p>
          </div>
          <Link to="/sobre" className="btn btn-outline-light">
            {t('home.localAction')} <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  )
}
