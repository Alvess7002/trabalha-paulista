import { Clock, GraduationCap } from 'lucide-react'
import PageHero from '../components/PageHero'
import InfoCard from '../components/InfoCard'
import { courses } from '../data/courses'

export default function Courses() {
  return (
    <>
      <PageHero title="Capacitação profissional" subtitle="Cursos para qualificar a sua carreira." />
      <section className="container section">
        <p className="notice">Cursos fictícios, criados apenas para demonstração.</p>
        <div className="grid">
          {courses.map((course) => (
            <InfoCard key={course.id} icon={GraduationCap} badge={course.categoria} title={course.nome}
              meta={course.duracao} metaIcon={Clock} description={course.descricao} />
          ))}
        </div>
      </section>
    </>
  )
}