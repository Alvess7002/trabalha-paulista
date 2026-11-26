import { useState } from 'react'
import { Clock, GraduationCap, Heart, SearchX } from 'lucide-react'
import PageHero from '../components/PageHero'
import InfoCard from '../components/InfoCard'
import BotaoFavorito from '../components/BotaoFavorito'
import { useAuth } from '../hooks/useAuth'
import { useCatalogo } from '../hooks/useCatalogo'
import { useFavoritos } from '../hooks/useFavoritos'
import { useIdioma } from '../idioma/useIdioma'

export default function Courses() {
  const { t, td } = useIdioma()
  const { user } = useAuth()
  const { ehFavorito } = useFavoritos()
  const [soFavoritos, setSoFavoritos] = useState(false)
  const todos = useCatalogo().publicados.courses
  const courses = soFavoritos ? todos.filter((c) => ehFavorito('course', c.id)) : todos

  return (
    <>
      <PageHero title={t('courses.title')} subtitle={t('courses.subtitle')} />
      <section className="container section">
        <p className="notice">{t('courses.notice')}</p>
        {user && (
          <div className="results-bar results-bar-end">
            <button
              type="button"
              className="btn btn-outline btn-sm"
              aria-pressed={soFavoritos}
              onClick={() => setSoFavoritos((v) => !v)}
            >
              <Heart size={16} aria-hidden="true" /> {t('fav.onlySaved')}
            </button>
          </div>
        )}
        {courses.length > 0 ? (
          <div className="grid">
            {courses.map((course) => (
              <InfoCard key={course.id} icon={GraduationCap} badge={td(course.categoria)} title={td(course.nome)}
                meta={td(course.duracao)} metaIcon={Clock} description={td(course.descricao)}
                titleAction={<BotaoFavorito tipo="course" id={course.id} nome={td(course.nome)} />} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <SearchX size={40} aria-hidden="true" />
            <h2>{t('courses.emptyTitle')}</h2>
            <p className="muted">{soFavoritos ? t('fav.emptyFilter') : t('courses.emptyText')}</p>
          </div>
        )}
      </section>
    </>
  )
}
