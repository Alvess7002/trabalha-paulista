import { Clock, GraduationCap, Star } from 'lucide-react'
import PageHero from '../components/PageHero'
import InfoCard from '../components/InfoCard'
import JobCard from '../components/JobCard'
import FavoriteButton from '../components/FavoriteButton'
import { jobs } from '../data/jobs'
import { courses } from '../data/courses'
import { useFeatures } from '../hooks/useFeatures'

export default function Favorites() {
  const { t, tr, label, favorites, favoritesCount } = useFeatures()
  const savedJobs = jobs.filter((j) => favorites.jobs.includes(j.id))
  const savedCourses = courses.filter((c) => favorites.courses.includes(c.id))

  return (
    <>
      <PageHero title={t('fav.pageTitle')} subtitle={t('fav.pageSubtitle')} />
      <section className="container section">
        {favoritesCount === 0 ? (
          <div className="empty-state">
            <Star size={40} aria-hidden="true" />
            <h2>{t('fav.emptyTitle')}</h2>
            <p className="muted">{t('fav.emptyText')}</p>
          </div>
        ) : (
          <>
            <h2>{t('fav.jobs')}</h2>
            {savedJobs.length > 0 ? (
              <div className="grid">{savedJobs.map((job) => <JobCard key={job.id} job={job} />)}</div>
            ) : (
              <p className="muted">{t('fav.emptyJobs')}</p>
            )}

            <h2 className="fav-heading">{t('fav.courses')}</h2>
            {savedCourses.length > 0 ? (
              <div className="grid">
                {savedCourses.map((raw) => {
                  const course = tr('courses', raw)
                  return (
                    <InfoCard key={course.id} icon={GraduationCap} badge={label('categoria', course.categoria)}
                      title={course.nome} meta={course.duracao} metaIcon={Clock} description={course.descricao}
                      footer={<FavoriteButton type="courses" id={course.id} />} />
                  )
                })}
              </div>
            ) : (
              <p className="muted">{t('fav.emptyCourses')}</p>
            )}
            <p className="muted auth-demo">{t('fav.note')}</p>
          </>
        )}
      </section>
    </>
  )
}
