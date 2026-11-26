import { Clock, GraduationCap, SearchX } from 'lucide-react'
import PageHero from '../components/PageHero'
import InfoCard from '../components/InfoCard'
import { useCatalogo } from '../hooks/useCatalogo'
import { useIdioma } from '../idioma/useIdioma'

export default function Courses() {
  const { t, td } = useIdioma()
  const courses = useCatalogo().publicados.courses

  return (
    <>
      <PageHero title={t('courses.title')} subtitle={t('courses.subtitle')} />
      <section className="container section">
        <p className="notice">{t('courses.notice')}</p>
        {courses.length > 0 ? (
          <div className="grid">
            {courses.map((course) => (
              <InfoCard key={course.id} icon={GraduationCap} badge={td(course.categoria)} title={td(course.nome)}
                meta={td(course.duracao)} metaIcon={Clock} description={td(course.descricao)} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <SearchX size={40} aria-hidden="true" />
            <h2>{t('courses.emptyTitle')}</h2>
            <p className="muted">{t('courses.emptyText')}</p>
          </div>
        )}
      </section>
    </>
  )
}
