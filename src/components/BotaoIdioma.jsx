import { Languages } from 'lucide-react'
import { useIdioma } from '../idioma/useIdioma'
import '../idioma/botao-idioma.css'

export default function BotaoIdioma() {
  const { t, alternarIdioma } = useIdioma()
  const label = t('idioma.switchTo')

  return (
    <button type="button" className="botao-idioma" onClick={alternarIdioma} aria-label={label} title={label}>
      <Languages size={18} aria-hidden="true" />
      <span>{t('idioma.short')}</span>
    </button>
  )
}
