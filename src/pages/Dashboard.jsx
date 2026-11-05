import { useNavigate } from 'react-router-dom'
import { Briefcase, GraduationCap, LogOut, Store } from 'lucide-react'
import InfoCard from '../components/InfoCard'
import { useAuth } from '../hooks/useAuth'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <section className="container section">
      <div className="dashboard-head">
        <div>
          <h1>Olá, {user.name.split(' ')[0]}!</h1>
          <p className="muted">Você está na área restrita (demonstrativa) · {user.email}</p>
        </div>
        <button type="button" className="btn btn-outline" onClick={handleLogout}>
          <LogOut size={18} aria-hidden="true" /> Sair
        </button>
      </div>

      <div className="grid">
        <InfoCard icon={Briefcase} title="Vagas" description="Veja as oportunidades disponíveis." to="/vagas" linkLabel="Ver vagas" />
        <InfoCard icon={GraduationCap} title="Cursos" description="Encontre cursos de capacitação." to="/capacitacao" linkLabel="Ver cursos" />
        <InfoCard icon={Store} title="Negócios locais" description="Conheça os empreendedores de Paulista." to="/empreendedorismo" linkLabel="Ver negócios" />
      </div>
    </section>
  )
}