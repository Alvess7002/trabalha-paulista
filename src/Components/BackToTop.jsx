import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { useFeatures } from '../hooks/useFeatures'

export default function BackToTop() {
  const { t } = useFeatures()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  if (!visible) return null
  return (
    <button type="button" className="back-to-top" onClick={goTop}
      aria-label={t('tools.backToTop')} title={t('tools.backToTop')}>
      <ArrowUp size={22} aria-hidden="true" />
    </button>
  )
}
