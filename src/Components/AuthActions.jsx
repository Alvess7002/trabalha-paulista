import { Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, LogIn, LogOut, UserPlus } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useFeatures } from '../hooks/useFeatures'

export default function AuthActions({ onNavigate }) {
  const { user, logout } = useAuth()
  const { t } = useFeatures()
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
          <LayoutDashboard size={18} aria-hidden="true" /> {t('auth.restricted')}
        </Link>
        <button type="button" className="btn btn-primary" onClick={handleLogout}>
          <LogOut size={18} aria-hidden="true" /> {t('auth.logout')}
        </button>
      </>
    )
  }

  return (
    <>
      <Link to="/login" className="btn btn-outline" onClick={onNavigate}>
        <LogIn size={18} aria-hidden="true" /> {t('auth.login')}
      </Link>
      <Link to="/cadastro" className="btn btn-primary" onClick={onNavigate}>
        <UserPlus size={18} aria-hidden="true" /> {t('auth.register')}
      </Link>
    </>
  )
}