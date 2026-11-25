
import { useState } from 'react'
import { Briefcase, MapPin, SearchX } from 'lucide-react'
import PageHero from '../components/PageHero'
import InfoCard from '../components/InfoCard'
import FormField from '../components/FormField'
import { jobs } from '../data/jobs'
import { normalize } from '../utils/text'

const bairroOf = (job) => job.local.split(',')[0].trim()
const sortPt = (a, b) => a.localeCompare(b, 'pt-BR')

const categoryOptions = [...new Set(jobs.map((j) => j.categoria))]
  .sort(sortPt)
  .map((c) => ({ value: c, label: c }))

const bairroOptions = [...new Set(jobs.map(bairroOf))]
  .sort(sortPt)
  .map((b) => ({ value: b, label: b }))

const EMPTY_FILTERS = { search: '', categoria: '', bairro: '' }

export default function Jobs() {
  const [filters, setFilters] = useState(EMPTY_FILTERS)

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

    return matchesSearch && matchesCategory && matchesBairro
  })

  const hasFilters = Object.values(filters).some(Boolean)
  const count = filteredJobs.length

  return (
    <>
      <PageHero
        title="Vagas de emprego"
        subtitle="Oportunidades em Paulista e região."
      />

      <section className="container section">
        <p className="notice">
          Vagas fictícias, criadas apenas para demonstração.
        </p>

        <form
          className="filters"
          role="search"
          aria-label="Buscar vagas"
          onSubmit={(e) => e.preventDefault()}
        >
          <FormField
            label="Encontre sua oportunidade"
            name="search"
            type="search"
            placeholder="Cargo, profissão ou empresa"
            value={filters.search}
            onChange={handleChange}
          />

          <FormField
            label="Categoria"
            name="categoria"
            as="select"
            placeholder="Todas as áreas"
            options={categoryOptions}
            value={filters.categoria}
            onChange={handleChange}
          />

          <FormField
            label="Localização"
            name="bairro"
            as="select"
            placeholder="Todos os bairros"
            options={bairroOptions}
            value={filters.bairro}
            onChange={handleChange}
          />
        </form>

        <div className="results-bar">
          <p className="muted" role="status" aria-live="polite">
            {count === 1
              ? '1 vaga encontrada'
              : `${count} vagas encontradas`}
          </p>

          {hasFilters && (
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => setFilters(EMPTY_FILTERS)}
            >
              Limpar filtros
            </button>
          )}
        </div>

        {count > 0 ? (
          <div className="grid">
            {filteredJobs.map((job) => (
              <InfoCard
                key={job.id}
                icon={Briefcase}
                badge={job.tipo}
                title={job.cargo}
                subtitle={job.empresa}
                meta={job.local}
                metaIcon={MapPin}
                description={job.descricao}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <SearchX size={40} aria-hidden="true" />
            <h2>Nenhuma vaga encontrada</h2>
            <p className="muted">
              Tente outro termo ou remova algum filtro.
            </p>
          </div>
        )}
      </section>
    </>
  )
}
