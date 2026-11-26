import { useMemo, useState } from 'react'
import { AuthContext } from './authContext'
import { isAdminEmail } from '../data/admin'

// Autenticação DEMONSTRATIVA: dados no localStorage do navegador, sem segurança real.
const USERS_KEY = 'tp_demo_users'
const SESSION_KEY = 'tp_demo_session'

function read(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => read(SESSION_KEY, null))
  // O papel de administrador é derivado do e-mail (demonstrativo), não salvo na sessão.
  const user = useMemo(
    () => (session ? { ...session, admin: isAdminEmail(session.email) } : null),
    [session],
  )

  const register = ({ name, email, password }) => {
    const users = read(USERS_KEY, [])
    const normalized = email.trim().toLowerCase()
    if (users.some((u) => u.email === normalized)) {
      return { ok: false, message: 'Este e-mail já está cadastrado.' }
    }
    const next = [...users, { name: name.trim(), email: normalized, password }]
    localStorage.setItem(USERS_KEY, JSON.stringify(next))
    return { ok: true }
  }

  const login = (email, password) => {
    const normalized = email.trim().toLowerCase()
    const found = read(USERS_KEY, []).find(
      (u) => u.email === normalized && u.password === password,
    )
    if (!found) return { ok: false, message: 'E-mail ou senha incorretos.' }
    const nova = { name: found.name, email: found.email }
    localStorage.setItem(SESSION_KEY, JSON.stringify(nova))
    setSession(nova)
    return { ok: true }
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    setSession(null)
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}