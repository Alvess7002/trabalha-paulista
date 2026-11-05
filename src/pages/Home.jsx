import { Link } from 'react-router-dom'
import { ArrowRight, Briefcase, GraduationCap, Store } from 'lucide-react'
import InfoCard from '../components/InfoCard'

const sections = [
  {
    icon: Briefcase,
    title: 'Oportunidades',
    description: 'Encontre vagas de emprego em Paulista e região em um só lugar.',
    to: '/vagas',
    linkLabel: 'Ver vagas',
  },
  {
    icon: GraduationCap,
    title: 'Capacitação',
    description: 'Descubra cursos e treinamentos para qualificar o seu currículo.',
    to: '/capacitacao',
    linkLabel: 'Ver cursos',
  },
  {
    icon: Store,
    title: 'Empreendedorismo',
    description: 'Conheça e divulgue os pequenos negócios do município.',
    to: '/empreendedorismo',
    linkLabel: 'Ver negócios',
  },
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <span className="eyebrow">Paulista · PE</span>
            <h1>Emprego, capacitação e empreendedorismo em um só lugar</h1>
            <p>
              O Trabalha Paulista reúne oportunidades, cursos e negócios locais para ajudar
              você a dar o próximo passo na carreira.
            </p>
            <div className="hero-actions">
              <Link to="/vagas" className="btn btn-light">
                Explorar vagas <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/sobre" className="btn btn-outline-light">
                Conhecer o projeto
              </Link>
            </div>
          </div>
          <div className="hero-panel" aria-hidden="true">
            <div><Briefcase size={22} /> Oportunidades de emprego</div>
            <div><GraduationCap size={22} /> Cursos de capacitação</div>
            <div><Store size={22} /> Negócios locais</div>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <h2>O que você encontra aqui</h2>
          <p className="muted">Três caminhos para impulsionar a sua vida profissional.</p>
        </div>
        <div className="grid">
          {sections.map((s) => (
            <InfoCard key={s.to} {...s} />
          ))}
        </div>
      </section>
    </>
  )
}