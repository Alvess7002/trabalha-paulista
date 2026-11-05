import PageHero from '../components/PageHero'

const objectives = [
  'Apresentar vagas de emprego de forma organizada.',
  'Facilitar a descoberta de cursos de capacitação.',
  'Dar visibilidade a pequenos empreendedores locais.',
  'Centralizar informações hoje dispersas em várias plataformas.',
]

const team = [
  'Giovanni Alves Bezerra da Silva',
  'Heytor Nascimento de Santana',
  'Matheus Ribeiro Lima Alves',
  'Nicolas França Amaral Sampaio',
]

export default function About() {
  return (
    <>
      <PageHero title="Sobre o projeto" subtitle="Conheça a proposta do Trabalha Paulista." />
      <section className="container section prose">
        <h2>Proposta</h2>
        <p>
          O Trabalha Paulista é uma plataforma de empregabilidade, capacitação profissional e
          empreendedorismo local em Paulista–PE. Ela nasce para resolver quatro problemas:
          dificuldade de encontrar vagas, dificuldade de localizar cursos, dificuldade dos
          pequenos empreendedores em divulgar seus negócios e informações espalhadas em
          diferentes plataformas.
        </p>
        <h2>Objetivos</h2>
        <ul>
          {objectives.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
        <h2>Equipe</h2>
        <ul>
          {team.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
        <p className="notice">
          Esta é uma versão acadêmica e demonstrativa: os conteúdos são fictícios e não há
          backend nem autenticação real.
        </p>
      </section>
    </>
  )
}