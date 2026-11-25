import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { useIdioma } from '../idioma/useIdioma'

export default function NotFound() {
  const { t } = useIdioma()

  return (
    <>
      <PageHero title={t('notFound.title')} subtitle={t('notFound.subtitle')} />
      <section className="container section">
        <Link to="/" className="btn btn-primary">{t('notFound.back')}</Link>
      </section>
    </>
  )
}
