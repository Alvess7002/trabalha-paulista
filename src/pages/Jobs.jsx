import { useState } from 'react'
import { SearchX } from 'lucide-react'
import PageHero from '../components/PageHero'
import FormField from '../components/FormField'
import JobCard from '../components/JobCard'
import { jobs } from '../data/jobs'
import { useFeatures } from '../hooks/useFeatures'
import { ageInDays } from '../utils/dates'
import { normalize } from '../utils/text'

const bairroOf = (job) => job.local.split(',')[0].trim()
const sortPt = (a, b) => a.localeCompare(b, 'pt-BR')

const categories = [...new Set(jobs.map((j) => j.categoria))].sort(sortPt)
const bairros = [...new Set(jobs.map(bairroOf))].sort(sortPt)

const EMPTY_FILTERS = { search: '', categoria: '', bairro: '', data: '' }
// Limite em dias de cada opção do filtro de data ('recent' só ordena, sem limite)
const DATE_LIMITS = { recent: Infinity, 1: 1, 7: 7, 30: 30 }

export default function Jobs() {
  const { t, tr, label } = useFeatures()
  const [filters, setFilters] = useState(EMPTY_FILTERS)

  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value })

  const categoryOptions = categories.map((c) => ({ value: c, label: label('categoria', c) }))
  const bairroOptions = bairros.map((b) => ({ value: b, label: b }))
  const dateOptions = [
    { value: 'recent', label: t('jobs.dateRecent') },
    { value: '1', label: t('jobs.date1') },
    { value: '7', label: t('jobs.date7') },
    { value: '30', label: t('jobs.date30') },
  ]

  const query = normalize(filters.search)
  const limit = DATE_LIMITS[filters.data]
  let filteredJobs = jobs.filter((job) => {
    const translated = tr('jobs', job)
    const matchesSearch =
      !query ||
      [job.cargo, job.categoria, job.empresa, translated.cargo, label('categoria', job.categoria)].some(
        (field) => normalize(field).includes(query),
      )
    const matchesCategory = !filters.categoria || job.categoria === filters.categoria
    const matchesBairro = !filters.bairro || bairroOf(job) === filters.bairro
    const matchesDate = limit === undefined || ageInDays(job.publicadaEm) <= limit
    return matchesSearch && matchesCategory && matchesBairro && matchesDate
  })
  // Com algum filtro de data ativo, as vagas mais recentes aparecem primeiro.
  if (filters.data) {
    filteredJobs = [...filteredJobs].sort((a, b) => b.publicadaEm.localeCompare(a.publicadaEm))
  }

  const hasFilters = Object.values(filters).some(Boolean)
  const count = filteredJobs.length

  return (
    <>
      <PageHero title={t('jobs.title')} subtitle={t('jobs.subtitle')} />
      <section className="container section">
        <p className="notice">{t('jobs.notice')}</p>

        <form className="filters" role="search" aria-label={t('jobs.searchAria')} onSubmit={(e) => e.preventDefault()}>
          <FormField label={t('jobs.search')} name="search" type="search"
            placeholder={t('jobs.searchPh')}
            value={filters.search} onChange={handleChange} />
          <FormField label={t('jobs.category')} name="categoria" as="select" placeholder={t('jobs.allCategories')}
            options={categoryOptions} value={filters.categoria} onChange={handleChange} />
          <FormField label={t('jobs.location')} name="bairro" as="select" placeholder={t('jobs.allLocations')}
            options={bairroOptions} value={filters.bairro} onChange={handleChange} />
          <FormField label={t('jobs.date')} name="data" as="select" placeholder={t('jobs.dateAny')}
            options={dateOptions} value={filters.data} onChange={handleChange} />
        </form>

        <div className="results-bar">
          <p className="muted" role="status" aria-live="polite">
            {count === 1 ? t('jobs.found.one') : t('jobs.found.many', { n: count })}
          </p>
          {hasFilters && (
            <button type="button" className="btn btn-outline btn-sm" onClick={() => setFilters(EMPTY_FILTERS)}>
              {t('jobs.clear')}
            </button>
          )}
        </div>

        {count > 0 ? (
          <div className="grid">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <SearchX size={40} aria-hidden="true" />
            <h2>{t('jobs.emptyTitle')}</h2>
            <p className="muted">{t('jobs.emptyText')}</p>
          </div>
        )}
      </section>
    </>
  )
}
