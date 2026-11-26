import { useContext } from 'react'
import { CatalogoContext } from '../context/catalogoContext'

export function useCatalogo() {
  const ctx = useContext(CatalogoContext)
  if (!ctx) throw new Error('useCatalogo deve ser usado dentro de CatalogoProvider')
  return ctx
}
