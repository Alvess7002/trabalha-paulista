import { Clock, GraduationCap } from 'lucide-react'
import PageHero from '../components/PageHero'
import InfoCard from '../components/InfoCard'
import FavoriteButton from '../components/FavoriteButton'
import { courses } from '../data/courses'
import { useIdioma } from '../idioma/useIdioma'

export default function Courses() {
  const { t, td } = useIdioma()

  return (
    <>
      <PageHero title={t('courses.title')} subtitle={t('courses.subtitle')} />
      <section className="container section">
        <p className="notice">{t('courses.notice')}</p>
        <div className="grid">
          {courses.map((course) => (
            <InfoCard key={course.id} icon={GraduationCap} badge={td(course.categoria)} title={td(course.nome)}
              meta={td(course.duracao)} metaIcon={Clock} description={td(course.descricao)} />
          ))}
        </div>
      </section>
    </>
  )
}
