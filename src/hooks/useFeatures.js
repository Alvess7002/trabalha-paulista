import { useContext } from 'react'
import { FeaturesContext } from '../context/featuresContext'

export function useFeatures() {
  const ctx = useContext(FeaturesContext)
  if (!ctx) throw new Error('useFeatures deve ser usado dentro de AppFeaturesProvider')
  return ctx
}
