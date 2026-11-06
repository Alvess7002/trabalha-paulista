import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Accessibility, Bell, Globe, Star } from 'lucide-react'
import { useFeatures } from '../hooks/useFeatures'

function NotificationBell() {
  const {
    t, tr, lang, unreadJobs, markAllSeen,
    browserAlerts, permission, enableBrowserAlerts, disableBrowserAlerts,
  } = useFeatures()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const count = unreadJobs.length

  useEffect(() => {
    if (!open) return
    const onClick = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const label = count > 0 ? t('notif.bellCount', { n: count }) : t('notif.bell')

  return (
    <div className="notif" ref={ref}>
      <button type="button" className="theme-toggle tool-btn" aria-label={label} title={label}
        aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((v) => !v)}>
        <Bell size={20} aria-hidden="true" />
        {count > 0 && <span className="tool-badge" aria-hidden="true">{count}</span>}
      </button>

      {open && (
        <div className="notif-panel" role="dialog" aria-label={t('notif.title')} data-lang={lang}>
          <strong>{t('notif.title')}</strong>
          {count === 0 ? (
            <p className="muted">{t('notif.empty')}</p>
          ) : (
            <ul>
              {unreadJobs.map((job) => (
                <li key={job.id}>
                  <Link to="/vagas" onClick={() => setOpen(false)}>
                    <span className="badge">{t('notif.newJob')}</span>
                    <span>{tr('jobs', job).cargo} · {job.empresa}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {count > 0 && (
            <button type="button" className="btn btn-outline btn-sm" onClick={markAllSeen}>
              {t('notif.markRead')}
            </button>
          )}
          {permission === 'unsupported' && <p className="muted notif-hint">{t('notif.unsupported')}</p>}
          {permission === 'denied' && <p className="muted notif-hint">{t('notif.denied')}</p>}
          {permission !== 'unsupported' && permission !== 'denied' && (
            <label className="notif-switch">
              <input type="checkbox" checked={browserAlerts && permission === 'granted'}
                onChange={(e) => (e.target.checked ? enableBrowserAlerts() : disableBrowserAlerts())} />
              <span>{browserAlerts && permission === 'granted' ? t('notif.enabled') : t('notif.enable')}</span>
            </label>
          )}
        </div>
      )}
    </div>
  )
}

export default function NavTools({ onNavigate }) {
  const { t, lang, toggleLang, a11y, toggleA11y, favoritesCount } = useFeatures()
  const a11yLabel = a11y ? t('tools.a11yOff') : t('tools.a11yOn')

  return (
    <div className="nav-tools">
      <button type="button" className="theme-toggle tool-btn lang-btn" onClick={toggleLang}
        aria-label={t('tools.langLabel')} title={t('tools.langLabel')} lang={lang === 'pt' ? 'en' : 'pt'}>
        <Globe size={18} aria-hidden="true" />
        <span>{lang === 'pt' ? 'EN' : 'PT'}</span>
      </button>

      <button type="button" className={`theme-toggle tool-btn ${a11y ? 'is-active' : ''}`}
        onClick={toggleA11y} aria-pressed={a11y} aria-label={a11yLabel} title={a11yLabel}>
        <Accessibility size={20} aria-hidden="true" />
      </button>

      <Link to="/favoritos" className="theme-toggle tool-btn" onClick={onNavigate}
        aria-label={t('tools.favorites')} title={t('tools.favorites')}>
        <Star size={20} aria-hidden="true" />
        {favoritesCount > 0 && <span className="tool-badge" aria-hidden="true">{favoritesCount}</span>}
      </Link>

      <NotificationBell />
    </div>
  )
}
