import { Star } from 'lucide-react'
import { useFeatures } from '../hooks/useFeatures'

export default function FavoriteButton({ type, id }) {
  const { t, isFavorite, toggleFavorite } = useFeatures()
  const active = isFavorite(type, id)
  const label = active ? t('fav.remove') : t('fav.add')

  return (
    <button type="button" className={`icon-btn ${active ? 'is-fav' : ''}`} onClick={() => toggleFavorite(type, id)}
      aria-pressed={active} aria-label={label} title={label}>
      <Star size={18} aria-hidden="true" fill={active ? 'currentColor' : 'none'} />
    </button>
  )
}
