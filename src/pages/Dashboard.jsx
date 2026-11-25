import { useNavigate } from 'react-router-dom'
import { Briefcase, GraduationCap, LogOut, Store } from 'lucide-react'
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
    <section className="container section">
      <div className="dashboard-head">
        <div>
          <h1>{t('dash.hello', { name: user.name.split(' ')[0] })}</h1>
          <p className="muted">{t('dash.subtitle', { email: user.email })}</p>
        </div>
        <button type="button" className="btn btn-outline" onClick={handleLogout}>
          <LogOut size={18} aria-hidden="true" /> {t('auth.logout')}
        </button>
      </div>

      <div className="grid">
        <InfoCard icon={Briefcase} title={t('dash.jobsTitle')} description={t('dash.jobsText')} to="/vagas" linkLabel={t('home.card1.link')} />
        <InfoCard icon={GraduationCap} title={t('dash.coursesTitle')} description={t('dash.coursesText')} to="/capacitacao" linkLabel={t('home.card2.link')} />
        <InfoCard icon={Store} title={t('dash.businessTitle')} description={t('dash.businessText')} to="/empreendedorismo" linkLabel={t('home.card3.link')} />
      </div>
    </section>
  )
}
