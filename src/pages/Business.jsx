import { MapPin, Store } from 'lucide-react'
import PageHero from '../components/PageHero'
import InfoCard from '../components/InfoCard'
import { businesses } from '../data/businesses'

export default function Business() {
  return (
    <>
      <PageHero title="Empreendedorismo local" subtitle="Conheça pequenos negócios de Paulista." />
      <section className="container section">
        <p className="notice">Negócios fictícios, criados apenas para demonstração.</p>
        <div className="grid">
          {businesses.map((b) => (
            <InfoCard key={b.id} icon={Store} badge={b.categoria} title={b.nome}
              meta={b.bairro} metaIcon={MapPin} description={b.descricao} />
          ))}
        </div>
      </section>
    </>
  )
}