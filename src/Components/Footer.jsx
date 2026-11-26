import { Briefcase } from 'lucide-react'
import { useIdioma } from '../idioma/useIdioma'

export default function Footer() {
  const { t } = useIdioma()
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <strong className="footer-brand">
            <Briefcase size={20} aria-hidden="true" /> Trabalha Paulista
          </strong>
          <p>{t('footer.tagline')}</p>
        </div>
        <p className="footer-note">{t('footer.note')}</p>
      </div>
    </footer>
  )
}