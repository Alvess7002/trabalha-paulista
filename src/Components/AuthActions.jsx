import { Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, LogIn, LogOut, UserPlus } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function AuthActions({ onNavigate }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    onNavigate()
    navigate('/')
  }

  if (user) {
    return (
      <>
        <Link to="/area-restrita" className="btn btn-outline" onClick={onNavigate}>
          <LayoutDashboard size={18} aria-hidden="true" /> Área restrita
        </Link>
        <button type="button" className="btn btn-primary" onClick={handleLogout}>
          <LogOut size={18} aria-hidden="true" /> Sair
        </button>
      </>
    )
  }

  return (
    <>
      <Link to="/login" className="btn btn-outline" onClick={onNavigate}>
        <LogIn size={18} aria-hidden="true" /> Entrar
      </Link>
      <Link to="/cadastro" className="btn btn-primary" onClick={onNavigate}>
        <UserPlus size={18} aria-hidden="true" /> Cadastrar
      </Link>
    </>
  )
}