import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Briefcase, Menu, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Início' },
  { to: '/vagas', label: 'Vagas' },
  { to: '/capacitacao', label: 'Capacitação' },
  { to: '/empreendedorismo', label: 'Empreendedorismo' },
  { to: '/sobre', label: 'Sobre' },
]

export default function Navbar() {
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
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`nav-menu ${open ? 'open' : ''}`} aria-label="Navegação principal">
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  onClick={close}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="nav-actions">{/* Ações de login entram na Etapa 6 */}</div>
        </nav>
      </div>
    </header>
  )
}