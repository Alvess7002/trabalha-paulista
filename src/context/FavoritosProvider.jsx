import { useState } from 'react'
import { FavoritosContext } from './favoritosContext'
import { useAuth } from '../hooks/useAuth'

const KEY = 'tp_demo_favorites'
const TIPOS = ['job', 'course']

function read() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY))
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export function FavoritosProvider({ children }) {
  const { user } = useAuth()
  const [all, setAll] = useState(read)

  const persist = (next) => {
    setAll(next)
    try {
      localStorage.setItem(KEY, JSON.stringify(next))
    } catch {
      return
    }
  }

  const favoritos = user
    ? all
        .filter((f) => f.email === user.email)
        .sort((a, b) => b.savedAt.localeCompare(a.savedAt))
    : []

  const ehFavorito = (tipo, id) => favoritos.some((f) => f.tipo === tipo && f.id === id)

  const alternar = (tipo, id) => {
    if (!user) return { ok: false, reason: 'auth' }
    if (!TIPOS.includes(tipo)) return { ok: false, reason: 'tipo' }
    const mesmo = (f) => f.email === user.email && f.tipo === tipo && f.id === id
    if (all.some(mesmo)) {
      persist(all.filter((f) => !mesmo(f)))
      return { ok: true, favorito: false }
    }
    persist([...all, { email: user.email, tipo, id, savedAt: new Date().toISOString() }])
    return { ok: true, favorito: true }
  }

  return (
    <FavoritosContext.Provider value={{ favoritos, ehFavorito, alternar }}>
      {children}
    </FavoritosContext.Provider>
  )
}
