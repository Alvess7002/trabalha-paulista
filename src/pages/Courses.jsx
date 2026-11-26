import { Clock, GraduationCap } from 'lucide-react'
import PageHero from '../components/PageHero'
import InfoCard from '../components/InfoCard'
import FavoriteButton from '../components/FavoriteButton'
import { courses } from '../data/courses'
import { useFeatures } from '../hooks/useFeatures'

export default function Courses() {
  const { t, tr, label } = useFeatures()
  return (
    <>
      <PageHero title={t('courses.title')} subtitle={t('courses.subtitle')} />
      <section className="container section">
        <p className="notice">{t('courses.notice')}</p>
        <div className="grid">
          {courses.map((raw) => {
            const course = tr('courses', raw)
            return (
              <InfoCard key={course.id} icon={GraduationCap} badge={label('categoria', course.categoria)}
                title={course.nome} meta={course.duracao} metaIcon={Clock} description={course.descricao}
                footer={<FavoriteButton type="courses" id={course.id} />} />
            )
          })}
        </div>
      </section>
    </>
  )
}
