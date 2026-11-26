
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Briefcase, CheckCircle2, MapPin, SearchX, Send } from 'lucide-react'
import PageHero from '../components/PageHero'
import InfoCard from '../components/InfoCard'
import FormField from '../components/FormField'
import { jobs } from '../data/jobs'
import { normalize, formatarData } from '../utils/text'
import { diasDesdePublicacao } from '../data/datasVagas'
import { useIdioma } from '../idioma/useIdioma'
import { useAuth } from '../hooks/useAuth'
import { useCandidaturas } from '../hooks/useCandidaturas'

const bairroOf = (job) => job.local.split(',')[0].trim()
const sortPt = (a, b) => a.localeCompare(b, 'pt-BR')

const categoryOptions = [...new Set(jobs.map((j) => j.categoria))]
  .sort(sortPt)
  .map((c) => ({ value: c, label: c }))

const bairroOptions = [...new Set(jobs.map(bairroOf))]
  .sort(sortPt)
  .map((b) => ({ value: b, label: b }))

const EMPTY_FILTERS = { search: '', categoria: '', bairro: '', periodo: '', ordem: '' }

export default function Jobs() {
  const { t, td, idioma } = useIdioma()
  const { user } = useAuth()
  const { getCandidatura, candidatar } = useCandidaturas()
  const navigate = useNavigate()
  const location = useLocation()
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  // Cargo da última vaga em que o usuário se candidatou (para o aviso de confirmação).
  const [appliedCargo, setAppliedCargo] = useState(null)

  const handleApply = (job) => {
    // Sem login, leva o usuário ao login e o traz de volta para as vagas depois.
    if (!user) {
      navigate('/login', {
        state: { noticeKey: 'jobs.needLoginApply', from: location.pathname },
      })
      return
    }
    const result = candidatar(job.id)
    if (result.ok) setAppliedCargo(job.cargo)
  }

  const handleChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value })

  const query = normalize(filters.search)

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      !query ||
      [job.cargo, job.categoria, job.empresa].some(
        (field) => normalize(field).includes(query)
      )

    const matchesCategory =
      !filters.categoria || job.categoria === filters.categoria

    const matchesBairro =
      !filters.bairro || bairroOf(job) === filters.bairro

    const matchesPeriodo =
      !filters.periodo || diasDesdePublicacao(job) <= Number(filters.periodo)

    return matchesSearch && matchesCategory && matchesBairro && matchesPeriodo
  })

  // Mais recentes primeiro (padrão); "antigas" inverte a ordem.
  const sign = filters.ordem === 'antigas' ? -1 : 1
  filteredJobs.sort((a, b) => sign * (diasDesdePublicacao(a) - diasDesdePublicacao(b)))

  const postedText = (job) => {
    const dias = diasDesdePublicacao(job)
    if (dias === 0) return t('jobs.postedToday')
    if (dias === 1) return t('jobs.postedYesterday')
    return t('jobs.postedDays', { days: dias })
  }

  const periodOptions = [
    { value: '1', label: t('jobs.period1') },
    { value: '7', label: t('jobs.period7') },
    { value: '30', label: t('jobs.period30') },
  ]
  const orderOptions = [{ value: 'antigas', label: t('jobs.orderOld') }]

  // Os valores dos filtros continuam em português (iguais aos dados); só o rótulo é traduzido.
  const translateOptions = (options) => options.map((o) => ({ ...o, label: td(o.label) }))

  const hasFilters = Object.values(filters).some(Boolean)
  const count = filteredJobs.length

  return (
    <>
      <PageHero
        title={t('jobs.title')}
        subtitle={t('jobs.subtitle')}
      />

      <section className="container section">
        <p className="notice">
          {t('jobs.notice')}
        </p>

        <form
          className="filters"
          role="search"
          aria-label={t('jobs.searchLabel')}
          onSubmit={(e) => e.preventDefault()}
        >
          <FormField
            label={t('jobs.search')}
            name="search"
            type="search"
            placeholder={t('jobs.searchPlaceholder')}
            value={filters.search}
            onChange={handleChange}
          />

          <FormField
            label={t('jobs.category')}
            name="categoria"
            as="select"
            placeholder={t('jobs.categoryAll')}
            options={translateOptions(categoryOptions)}
            value={filters.categoria}
            onChange={handleChange}
          />

          <FormField
            label={t('jobs.location')}
            name="bairro"
            as="select"
            placeholder={t('jobs.locationAll')}
            options={translateOptions(bairroOptions)}
            value={filters.bairro}
            onChange={handleChange}
          />

          <FormField
            label={t('jobs.period')}
            name="periodo"
            as="select"
            placeholder={t('jobs.periodAll')}
            options={periodOptions}
            value={filters.periodo}
            onChange={handleChange}
          />

          <FormField
            label={t('jobs.order')}
            name="ordem"
            as="select"
            placeholder={t('jobs.orderRecent')}
            options={orderOptions}
            value={filters.ordem}
            onChange={handleChange}
          />
        </form>

        <div className="results-bar">
          <p className="muted" role="status" aria-live="polite">
            {count === 1
              ? t('jobs.countOne')
              : t('jobs.countMany', { count })}
          </p>

          {hasFilters && (
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => setFilters(EMPTY_FILTERS)}
            >
              {t('jobs.clear')}
            </button>
          )}
        </div>

        {appliedCargo && (
          <div className="alert alert-success" role="status">
            {t('jobs.applySuccess', { cargo: td(appliedCargo) })}{' '}
            <Link to="/area-restrita" className="alert-link">{t('jobs.viewApplications')}</Link>
          </div>
        )}

        {count > 0 ? (
          <div className="grid">
            {filteredJobs.map((job) => {
              const candidatura = getCandidatura(job.id)
              return (
              <InfoCard
                key={job.id}
                icon={Briefcase}
                badge={td(job.tipo)}
                title={td(job.cargo)}
                subtitle={job.empresa}
                meta={`${job.local} · ${postedText(job)}`}
                metaIcon={MapPin}
                description={td(job.descricao)}
                footer={
                  candidatura ? (
                    <>
                      <span className="apply-done">
                        <CheckCircle2 size={18} aria-hidden="true" /> {t('jobs.applied')}
                      </span>
                      <span className="muted apply-date">
                        {t('jobs.appliedOn', { date: formatarData(candidatura.appliedAt, idioma) })}
                      </span>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary btn-block"
                      aria-label={t('jobs.applyAria', { cargo: td(job.cargo), empresa: job.empresa })}
                      onClick={() => handleApply(job)}
                    >
                      <Send size={18} aria-hidden="true" /> {t('jobs.apply')}
                    </button>
                  )
                }
              />
              )
            })}
          </div>
        ) : (
          <div className="empty-state">
            <SearchX size={40} aria-hidden="true" />
            <h2>{t('jobs.emptyTitle')}</h2>
            <p className="muted">
              {t('jobs.emptyText')}
            </p>
          </div>
        )}
      </section>
    </>
  )
}
