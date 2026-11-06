import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { useFeatures } from '../hooks/useFeatures'

export default function NotFound() {
  const { t } = useFeatures()
  return (
    <>
      <PageHero title={t('nf.title')} subtitle={t('nf.subtitle')} />
      <section className="container section">
        <Link to="/" className="btn btn-primary">{t('nf.back')}</Link>
      </section>
    </>
  )
}