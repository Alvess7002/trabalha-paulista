import { MapPin, Store } from 'lucide-react'
import PageHero from '../components/PageHero'
import InfoCard from '../components/InfoCard'
import { businesses } from '../data/businesses'
import { useFeatures } from '../hooks/useFeatures'

export default function Business() {
  const { t, tr, label } = useFeatures()
  return (
    <>
      <PageHero title={t('business.title')} subtitle={t('business.subtitle')} />
      <section className="container section">
        <p className="notice">{t('business.notice')}</p>
        <div className="grid">
          {businesses.map((raw) => {
            const b = tr('businesses', raw)
            return (
              <InfoCard key={b.id} icon={Store} badge={label('categoria', b.categoria)} title={b.nome}
                meta={b.bairro} metaIcon={MapPin} description={b.descricao} />
            )
          })}
        </div>
      </section>
    </>
  )
}
