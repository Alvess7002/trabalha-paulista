import { useNavigate } from 'react-router-dom'
import { Briefcase, GraduationCap, LogOut, Store } from 'lucide-react'
import InfoCard from '../components/InfoCard'
import { useFeatures } from '../hooks/useFeatures'
import { useAuth } from '../hooks/useAuth'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const { t } = useFeatures()
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
          <p className="muted">{t('dash.sub', { email: user.email })}</p>
        </div>
        <button type="button" className="btn btn-outline" onClick={handleLogout}>
          <LogOut size={18} aria-hidden="true" /> {t('auth.logout')}
        </button>
      </div>

      <div className="grid">
        <InfoCard icon={Briefcase} title={t('dash.jobs')} description={t('dash.jobsDesc')} to="/vagas" linkLabel={t('dash.jobsLink')} />
        <InfoCard icon={GraduationCap} title={t('dash.courses')} description={t('dash.coursesDesc')} to="/capacitacao" linkLabel={t('dash.coursesLink')} />
        <InfoCard icon={Store} title={t('dash.business')} description={t('dash.businessDesc')} to="/empreendedorismo" linkLabel={t('dash.businessLink')} />
      </div>
    </section>
  )
}