import PageHero from '../components/PageHero'
import { useIdioma } from '../idioma/useIdioma'

const objectiveKeys = ['about.obj1', 'about.obj2', 'about.obj3', 'about.obj4']

const team = [
  'Giovanni Alves Bezerra da Silva',
  'Heytor Nascimento de Santana',
  'Matheus Ribeiro Lima Alves',
  'Nicolas França Amaral Sampaio',
]

export default function About() {
  const { t } = useIdioma()

  return (
    <>
      <PageHero title={t('about.title')} subtitle={t('about.subtitle')} />
      <section className="container section prose">
        <h2>{t('about.proposalTitle')}</h2>
        <p>{t('about.proposalText')}</p>
        <h2>{t('about.objectivesTitle')}</h2>
        <ul>
          {objectiveKeys.map((key) => (
            <li key={key}>{t(key)}</li>
          ))}
        </ul>
        <h2>{t('about.teamTitle')}</h2>
        <ul>
          {team.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
        <p className="notice">{t('about.notice')}</p>
      </section>
    </>
  )
}
