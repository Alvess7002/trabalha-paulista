import { useContext } from 'react'
import { CandidaturasContext } from '../context/candidaturasContext'

export function useCandidaturas() {
  const ctx = useContext(CandidaturasContext)
  if (!ctx) throw new Error('useCandidaturas deve ser usado dentro de CandidaturasProvider')
  return ctx
}
