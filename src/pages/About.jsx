import PageHero from '../components/PageHero'
import { useFeatures } from '../hooks/useFeatures'

const objectives = ['about.g1', 'about.g2', 'about.g3', 'about.g4']

const team = [
  'Giovanni Alves Bezerra da Silva',
  'Heytor Nascimento de Santana',
  'Matheus Ribeiro Lima Alves',
  'Nicolas França Amaral Sampaio',
]

export default function About() {
  const { t } = useFeatures()
  return (
    <>
      <PageHero title={t('about.title')} subtitle={t('about.subtitle')} />
      <section className="container section prose">
        <h2>{t('about.h.proposal')}</h2>
        <p>
          {t('about.proposal')}
        </p>
        <h2>{t('about.h.goals')}</h2>
        <ul>
          {objectives.map((o) => (
            <li key={o}>{t(o)}</li>
          ))}
        </ul>
        <h2>{t('about.h.team')}</h2>
        <ul>
          {team.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
        <p className="notice">
          {t('about.notice')}
        </p>
      </section>
    </>
  )
}