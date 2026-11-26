import { MapPin, SearchX, Store } from 'lucide-react'
import PageHero from '../components/PageHero'
import InfoCard from '../components/InfoCard'
import { useCatalogo } from '../hooks/useCatalogo'
import { useIdioma } from '../idioma/useIdioma'

export default function Business() {
  const { t, td } = useIdioma()
  const businesses = useCatalogo().publicados.businesses

  return (
    <>
      <PageHero title={t('business.title')} subtitle={t('business.subtitle')} />
      <section className="container section">
        <p className="notice">{t('business.notice')}</p>
        {businesses.length > 0 ? (
          <div className="grid">
            {businesses.map((b) => (
              <InfoCard key={b.id} icon={Store} badge={td(b.categoria)} title={td(b.nome)}
                meta={b.bairro} metaIcon={MapPin} description={td(b.descricao)} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <SearchX size={40} aria-hidden="true" />
            <h2>{t('business.emptyTitle')}</h2>
            <p className="muted">{t('business.emptyText')}</p>
          </div>
        )}
      </section>
    </>
  )
}
