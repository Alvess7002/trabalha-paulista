import { Link, useNavigate } from 'react-router-dom'
import { ArrowUpRight, Briefcase, ShieldCheck, CalendarDays, Clock, FastForward, GraduationCap, Heart, LogOut, MapPin, Store } from 'lucide-react'
import InfoCard from '../components/InfoCard'
import { useAuth } from '../hooks/useAuth'
import { useCandidaturas } from '../hooks/useCandidaturas'
import { useCatalogo } from '../hooks/useCatalogo'
import { useFavoritos } from '../hooks/useFavoritos'
import { useIdioma } from '../idioma/useIdioma'
import { infoStatus, proximoStatus } from '../data/statusCandidatura'
import { formatarData } from '../utils/text'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const { t, td, idioma } = useIdioma()
  const { candidaturas, avancarStatus } = useCandidaturas()
  // Todas as vagas (inclusive rascunhos), para o histórico de candidaturas não perder o cargo.
  const { jobs, courses } = useCatalogo()
  const { favoritos, alternar } = useFavoritos()
  const favVagas = favoritos.filter((f) => f.tipo === 'job')
  const favCursos = favoritos.filter((f) => f.tipo === 'course')
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

      {user.admin && (
        <div className="admin-banner">
          <ShieldCheck size={28} aria-hidden="true" />
          <div>
            <h2>{t('dash.adminTitle')}</h2>
            <p>{t('dash.adminText')}</p>
          </div>
          <Link to="/admin" className="btn btn-primary">{t('dash.adminLink')}</Link>
        </div>
      )}

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
          <span className="section-kicker">{t('fav.kicker')}</span>
          <h2 id="meus-favoritos">{t('fav.title')}</h2>
        </div>
        <p className="muted">{t('fav.text')}</p>
      </div>

      {favoritos.length > 0 ? (
        <div className="favorites">
          {favVagas.length > 0 && (
            <>
              <h3 id="favoritos-vagas">{t('fav.jobs')}</h3>
              <ul className="applications favorites-list" aria-labelledby="favoritos-vagas">
                {favVagas.map((f) => {
                  const job = jobs.find((j) => j.id === f.id)
                  const nome = job ? td(job.cargo) : t('fav.unavailable')
                  return (
                    <li key={`job-${f.id}`} className="application">
                      <div className="application-main">
                        <h4>{nome}</h4>
                        {job && <p className="card-subtitle">{job.empresa}</p>}
                        <p className="card-meta">
                          {job && (
                            <>
                              <MapPin size={16} aria-hidden="true" /> {job.local}
                              <span aria-hidden="true">·</span>
                            </>
                          )}
                          <CalendarDays size={16} aria-hidden="true" />
                          {t('fav.savedOn', { date: formatarData(f.savedAt, idioma) })}
                        </p>
                      </div>
                      <div className="application-side">
                        {job?.publicado && (
                          <Link to="/vagas" className="btn btn-outline btn-sm">{t('fav.viewJobs')}</Link>
                        )}
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          aria-label={t('fav.removeAria', { nome })}
                          onClick={() => alternar('job', f.id)}
                        >
                          <Heart size={16} aria-hidden="true" /> {t('fav.removeShort')}
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </>
          )}

          {favCursos.length > 0 && (
            <>
              <h3 id="favoritos-cursos">{t('fav.courses')}</h3>
              <ul className="applications favorites-list" aria-labelledby="favoritos-cursos">
                {favCursos.map((f) => {
                  const curso = courses.find((c) => c.id === f.id)
                  const nome = curso ? td(curso.nome) : t('fav.unavailable')
                  return (
                    <li key={`course-${f.id}`} className="application">
                      <div className="application-main">
                        <h4>{nome}</h4>
                        {curso && <p className="card-subtitle">{td(curso.categoria)}</p>}
                        <p className="card-meta">
                          {curso && (
                            <>
                              <Clock size={16} aria-hidden="true" /> {td(curso.duracao)}
                              <span aria-hidden="true">·</span>
                            </>
                          )}
                          <CalendarDays size={16} aria-hidden="true" />
                          {t('fav.savedOn', { date: formatarData(f.savedAt, idioma) })}
                        </p>
                      </div>
                      <div className="application-side">
                        {curso?.publicado && (
                          <Link to="/capacitacao" className="btn btn-outline btn-sm">{t('fav.viewCourses')}</Link>
                        )}
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          aria-label={t('fav.removeAria', { nome })}
                          onClick={() => alternar('course', f.id)}
                        >
                          <Heart size={16} aria-hidden="true" /> {t('fav.removeShort')}
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </>
          )}
        </div>
      ) : (
        <div className="empty-state applications-empty">
          <Heart size={40} aria-hidden="true" />
          <h3>{t('fav.emptyTitle')}</h3>
          <p className="muted">{t('fav.emptyText')}</p>
          <Link to="/vagas" className="btn btn-primary">{t('fav.viewJobs')}</Link>
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
