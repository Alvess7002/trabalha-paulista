import { Link, Navigate } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useIdioma } from '../idioma/useIdioma'

// Só administradores entram. Sem login, vai ao login (e volta ao painel depois);
// logado sem permissão, vê um aviso. Checagem apenas demonstrativa (feita no navegador).
export default function AdminRoute({ children }) {
  const { user } = useAuth()
  const { t } = useIdioma()

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ noticeKey: 'login.needLogin', from: '/admin' }}
      />
    )
  }

  if (!user.admin) {
    return (
      <section className="container section">
        <div className="empty-state">
          <ShieldAlert size={40} aria-hidden="true" />
          <h1>{t('admin.denied.title')}</h1>
          <p className="muted">{t('admin.denied.text')}</p>
          <Link to="/area-restrita" className="btn btn-primary">{t('admin.denied.back')}</Link>
        </div>
      </section>
    )
  }

  return children
}
