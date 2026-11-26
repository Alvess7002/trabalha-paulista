import { useState } from 'react'
import { CandidaturasContext } from './candidaturasContext'
import { useAuth } from '../hooks/useAuth'
import { STATUS_INICIAL, proximoStatus } from '../data/statusCandidatura'

// Candidaturas DEMONSTRATIVAS: ficam no localStorage do navegador, sem backend.
// Cada registro: { email, jobId, appliedAt (ISO), status }.
// O vínculo com o usuário é feito pelo e-mail (o mesmo identificador usado no AuthProvider).
const KEY = 'tp_demo_applications'

function read() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY))
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export function CandidaturasProvider({ children }) {
  const { user } = useAuth()
  const [all, setAll] = useState(read)

  const persist = (next) => {
    setAll(next)
    try {
      localStorage.setItem(KEY, JSON.stringify(next))
    } catch {
      /* localStorage indisponível: a candidatura vale apenas nesta sessão */
    }
  }

  // Somente as candidaturas do usuário logado, da mais recente para a mais antiga.
  const candidaturas = user
    ? all
        .filter((c) => c.email === user.email)
        .sort((a, b) => b.appliedAt.localeCompare(a.appliedAt))
    : []

  const getCandidatura = (jobId) => candidaturas.find((c) => c.jobId === jobId)

  const candidatar = (jobId) => {
    if (!user) return { ok: false, reason: 'auth' }
    if (all.some((c) => c.email === user.email && c.jobId === jobId)) {
      return { ok: false, reason: 'duplicate' }
    }
    const nova = {
      email: user.email,
      jobId,
      appliedAt: new Date().toISOString(),
      status: STATUS_INICIAL,
    }
    persist([...all, nova])
    return { ok: true, candidatura: nova }
  }

  // Apenas para a demonstração: faz o papel da empresa, avançando o status da candidatura.
  const avancarStatus = (jobId) => {
    if (!user) return
    persist(
      all.map((c) => {
        if (c.email !== user.email || c.jobId !== jobId) return c
        return { ...c, status: proximoStatus(c.status) ?? c.status }
      }),
    )
  }

  return (
    <CandidaturasContext.Provider
      value={{ candidaturas, getCandidatura, candidatar, avancarStatus }}
    >
      {children}
    </CandidaturasContext.Provider>
  )
}
