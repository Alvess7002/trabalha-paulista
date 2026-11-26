import { useState } from 'react'
import { AuthContext } from './authContext'

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
  const [user, setUser] = useState(() => read(SESSION_KEY, null))

  const register = ({ name, email, password }) => {
    const users = read(USERS_KEY, [])
    const normalized = email.trim().toLowerCase()
    if (users.some((u) => u.email === normalized)) {
      return { ok: false, message: 'register.emailTaken' }
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
    if (!found) return { ok: false, message: 'login.badCredentials' }
    const session = { name: found.name, email: found.email }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
    return { ok: true }
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}