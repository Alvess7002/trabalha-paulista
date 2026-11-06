import { MessageCircle } from 'lucide-react'
import { useFeatures } from '../hooks/useFeatures'

export default function ShareButton({ job }) {
  const { t, tr } = useFeatures()
  const label = t('share.whatsapp')

  const share = () => {
    const j = tr('jobs', job)
    const text = `${t('share.text', { cargo: j.cargo, empresa: j.empresa, local: j.local })} ${window.location.origin}/vagas`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <button type="button" className="icon-btn" onClick={share} aria-label={label} title={label}>
      <MessageCircle size={18} aria-hidden="true" />
    </button>
  )
}
