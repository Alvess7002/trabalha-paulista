import { Briefcase, MapPin } from 'lucide-react'
import PageHero from '../components/PageHero'
import InfoCard from '../components/InfoCard'
import { jobs } from '../data/jobs'

export default function Jobs() {
  return (
    <>
      <PageHero title="Vagas de emprego" subtitle="Oportunidades em Paulista e região." />
      <section className="container section">
        <p className="notice">Vagas fictícias, criadas apenas para demonstração.</p>
        <div className="grid">
          {jobs.map((job) => (
            <InfoCard key={job.id} icon={Briefcase} badge={job.tipo} title={job.cargo}
              subtitle={job.empresa} meta={job.local} metaIcon={MapPin} description={job.descricao} />
          ))}
        </div>
      </section>
    </>
  )
}