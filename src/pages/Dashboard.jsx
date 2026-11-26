import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, Briefcase, GraduationCap, LogOut, Store } from 'lucide-react'
import InfoCard from '../components/InfoCard'
import { useAuth } from '../hooks/useAuth'
import { useIdioma } from '../idioma/useIdioma'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const { t } = useIdioma()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <section className="container section dashboard-page">
      <div className="dashboard-head">
        <div>
          <span className="section-kicker">{t('auth.restricted')}</span>
          <h1>{t('dash.hello', { name: user.name.split(' ')[0] })}</h1>
          <p className="muted">{t('dash.subtitle', { email: user.email })}</p>
        </div>
        <button type="button" className="btn btn-outline" onClick={handleLogout}>
          <LogOut size={18} aria-hidden="true" /> {t('auth.logout')}
        </button>
      </div>

      <div className="dashboard-welcome">
        <div>
          <span className="dashboard-welcome-label">{t('dash.demoTag')}</span>
          <h2>{t('dash.welcomeTitle')}</h2>
          <p>{t('dash.welcomeText')}</p>
        </div>
        <ArrowUpRight size={28} aria-hidden="true" />
      </div>

      <div className="section-head dashboard-section-head">
        <div>
          <span className="section-kicker">{t('dash.shortcutsKicker')}</span>
          <h2>{t('dash.shortcutsTitle')}</h2>
        </div>
        <p className="muted">{t('dash.shortcutsText')}</p>
      </div>

      <div className="grid dashboard-grid">
        <InfoCard icon={Briefcase} title={t('dash.jobsTitle')} description={t('dash.jobsText')} to="/vagas" linkLabel={t('home.card1.link')} className="dashboard-card" />
        <InfoCard icon={GraduationCap} title={t('dash.coursesTitle')} description={t('dash.coursesText')} to="/capacitacao" linkLabel={t('home.card2.link')} className="dashboard-card" />
        <InfoCard icon={Store} title={t('dash.businessTitle')} description={t('dash.businessText')} to="/empreendedorismo" linkLabel={t('home.card3.link')} className="dashboard-card" />
      </div>
    </section>
  )
}
