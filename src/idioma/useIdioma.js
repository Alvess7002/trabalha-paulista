import { useContext } from 'react'
import { ContextoIdioma } from './contextoIdioma'

export function useIdioma() {
  const ctx = useContext(ContextoIdioma)
  if (!ctx) throw new Error('useIdioma deve ser usado dentro de <ProvedorIdioma>')
  return ctx
}
