import { MapPin, Store } from 'lucide-react'
import PageHero from '../components/PageHero'
import InfoCard from '../components/InfoCard'
import { businesses } from '../data/businesses'
import { useIdioma } from '../idioma/useIdioma'

export default function Business() {
  const { t, td } = useIdioma()

  return (
    <>
      <PageHero title={t('business.title')} subtitle={t('business.subtitle')} />
      <section className="container section">
        <p className="notice">{t('business.notice')}</p>
        <div className="grid">
          {businesses.map((b) => (
            <InfoCard key={b.id} icon={Store} badge={td(b.categoria)} title={td(b.nome)}
              meta={b.bairro} metaIcon={MapPin} description={td(b.descricao)} />
          ))}
        </div>
      </section>
    </>
  )
}
