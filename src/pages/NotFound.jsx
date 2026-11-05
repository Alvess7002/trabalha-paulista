import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

export default function NotFound() {
  return (
    <>
      <PageHero title="Página não encontrada" subtitle="O endereço acessado não existe." />
      <section className="container section">
        <Link to="/" className="btn btn-primary">Voltar ao início</Link>
      </section>
    </>
  )
}