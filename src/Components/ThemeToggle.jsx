import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { useIdioma } from '../idioma/useIdioma'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const { t } = useIdioma()
  const isDark = theme === 'dark'
  const label = isDark ? t('theme.light') : t('theme.dark')

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label={label} title={label}>
      {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
    </button>
  )
}