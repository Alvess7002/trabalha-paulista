
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Briefcase, Menu, X } from 'lucide-react'
import AuthActions from './AuthActions'
import ThemeToggle from './ThemeToggle'
import BotaoIdioma from './BotaoIdioma'
import { useIdioma } from '../idioma/useIdioma'

const links = [
  { to: '/', labelKey: 'nav.home' },
  { to: '/vagas', labelKey: 'nav.jobs' },
  { to: '/capacitacao', labelKey: 'nav.courses' },
  { to: '/empreendedorismo', labelKey: 'nav.business' },
  { to: '/sobre', labelKey: 'nav.about' },
  { to: '/contato', labelKey: 'nav.contact' },
]

export default function Navbar() {
  const { t } = useIdioma()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-mark"><Briefcase size={22} aria-hidden="true" /></span>
          <span className="brand-name"><strong>Trabalha</strong> Paulista</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
          aria-expanded={open}
          aria-controls="menu-principal"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav
          id="menu-principal"
          className={`nav-menu ${open ? 'open' : ''}`}
          aria-label={t('nav.mainLabel')}
        >
          <ul className="nav-links" aria-label={t('nav.mainLabel')}>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    isActive ? 'active' : undefined
                  }
                  onClick={close}
                >
                  {t(link.labelKey)}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <BotaoIdioma />
            <ThemeToggle />
            <AuthActions onNavigate={close} />
          </div>
        </nav>
      </div>
    </header>
  )
}
