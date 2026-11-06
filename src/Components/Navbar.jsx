import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Briefcase, Menu, X } from 'lucide-react'
import AuthActions from './AuthActions'
import ThemeToggle from './ThemeToggle'
import NavTools from './NavTools'
import { useFeatures } from '../hooks/useFeatures'

const links = [
  { to: '/', key: 'nav.home' },
  { to: '/vagas', key: 'nav.jobs' },
  { to: '/capacitacao', key: 'nav.courses' },
  { to: '/empreendedorismo', key: 'nav.business' },
  { to: '/sobre', key: 'nav.about' },
  { to: '/contato', key: 'nav.contact' },
]

export default function Navbar() {
  const { t } = useFeatures()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand" onClick={close}>
          <Briefcase size={24} aria-hidden="true" />
          <span>Trabalha</span> Paulista
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? t('nav.close') : t('nav.open')}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`nav-menu ${open ? 'open' : ''}`} aria-label={t('nav.main')}>
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  onClick={close}
                >
                  {t(link.key)}
                </NavLink>
              </li>
            ))}
          </ul>
                    <div className="nav-actions">
            <NavTools onNavigate={close} />
            <ThemeToggle />
            <AuthActions onNavigate={close} />
          </div>
        </nav>
      </div>
    </header>
  )
}