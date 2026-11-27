import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { useIdioma } from '../idioma/useIdioma'

const LIMITE = 400

export default function BotaoTopo() {
  const { t } = useIdioma()
  const [visivel, setVisivel] = useState(() => window.scrollY > LIMITE)

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > LIMITE)
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  const voltar = () => {
    const semMovimento =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.documentElement.hasAttribute('data-a11y-sem-animacao')
    window.scrollTo({ top: 0, behavior: semMovimento ? 'auto' : 'smooth' })
    document.getElementById('conteudo')?.focus({ preventScroll: true })
  }

  if (!visivel) return null

  return (
    <button
      type="button"
      className="botao-topo"
      onClick={voltar}
      aria-label={t('topo.voltar')}
      title={t('topo.voltar')}
    >
      <ArrowUp size={24} aria-hidden="true" />
    </button>
  )
}
