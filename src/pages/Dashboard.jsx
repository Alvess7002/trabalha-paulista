import { Link, useNavigate } from 'react-router-dom'
import { ArrowUpRight, Briefcase, CalendarDays, FastForward, GraduationCap, LogOut, MapPin, Store } from 'lucide-react'
import InfoCard from '../components/InfoCard'
import { useAuth } from '../hooks/useAuth'
import { useCandidaturas } from '../hooks/useCandidaturas'
import { useIdioma } from '../idioma/useIdioma'
import { jobs } from '../data/jobs'
import { infoStatus, proximoStatus } from '../data/statusCandidatura'
import { formatarData } from '../utils/text'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const { t, td, idioma } = useIdioma()
  const { candidaturas, avancarStatus } = useCandidaturas()
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
          <span className="section-kicker">{t('dash.appsKicker')}</span>
          <h2 id="minhas-candidaturas">{t('dash.appsTitle')}</h2>
        </div>
        <p className="muted">{t('dash.appsText')}</p>
      </div>

      {candidaturas.length > 0 ? (
        <>
          <p className="notice">{t('dash.appsDemoNote')}</p>
          <ul className="applications" aria-labelledby="minhas-candidaturas">
            {candidaturas.map((c) => {
              const job = jobs.find((j) => j.id === c.jobId)
              const status = infoStatus(c.status)
              const podeAvancar = proximoStatus(c.status) !== null
              return (
                <li key={c.jobId} className="application">
                  <div className="application-main">
                    <h3>{job ? td(job.cargo) : t('dash.jobUnavailable')}</h3>
                    {job && <p className="card-subtitle">{job.empresa}</p>}
                    <p className="card-meta">
                      {job && (
                        <>
                          <MapPin size={16} aria-hidden="true" /> {job.local}
                          <span aria-hidden="true">·</span>
                        </>
                      )}
                      <CalendarDays size={16} aria-hidden="true" />
                      {t('dash.appliedOn', { date: formatarData(c.appliedAt, idioma) })}
                    </p>
                  </div>
                  <div className="application-side">
                    <span className={`status-badge status-${status.tone}`}>
                      <span className="visually-hidden">{t('dash.statusLabel')}: </span>
                      {t(status.tKey)}
                    </span>
                    {podeAvancar && (
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={() => avancarStatus(c.jobId)}
                      >
                        <FastForward size={16} aria-hidden="true" /> {t('dash.advance')}
                      </button>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </>
      ) : (
        <div className="empty-state applications-empty">
          <Briefcase size={40} aria-hidden="true" />
          <h3>{t('dash.appsEmptyTitle')}</h3>
          <p className="muted">{t('dash.appsEmptyText')}</p>
          <Link to="/vagas" className="btn btn-primary">{t('home.card1.link')}</Link>
        </div>
      )}

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
