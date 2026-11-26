import { useCallback, useEffect, useMemo, useState } from 'react'
import { FeaturesContext } from './featuresContext'
import { dataEn, messages } from '../i18n/messages'
import { jobs } from '../data/jobs'
import { ageInDays } from '../utils/dates'

const KEYS = {
  lang: 'tp_lang',
  a11y: 'tp_a11y',
  favorites: 'tp_favorites',
  seen: 'tp_notif_seen',
  browser: 'tp_notif_browser',
  pushed: 'tp_notif_pushed',
}
const NEW_JOB_DAYS = 7

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* localStorage indisponível */
  }
}

const interpolate = (text, vars) =>
  vars ? text.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : `{${k}}`)) : text

const notificationsSupported = () => typeof Notification !== 'undefined'

export function AppFeaturesProvider({ children }) {
  const [lang, setLang] = useState(() => (read(KEYS.lang, 'pt') === 'en' ? 'en' : 'pt'))
  const [a11y, setA11y] = useState(() => read(KEYS.a11y, false) === true)
  const [favorites, setFavorites] = useState(() => {
    const saved = read(KEYS.favorites, {})
    return { jobs: saved.jobs ?? [], courses: saved.courses ?? [] }
  })
  const [seen, setSeen] = useState(() => read(KEYS.seen, []))
  const [browserAlerts, setBrowserAlerts] = useState(() => read(KEYS.browser, false) === true)
  const [permission, setPermission] = useState(() =>
    notificationsSupported() ? Notification.permission : 'unsupported',
  )

  /* Idioma */
  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR'
  }, [lang])

  const toggleLang = () => {
    const next = lang === 'pt' ? 'en' : 'pt'
    setLang(next)
    write(KEYS.lang, next)
  }

  const t = useCallback(
    (key, vars) => interpolate(messages[lang][key] ?? messages.pt[key] ?? key, vars),
    [lang],
  )

  // Traduz os campos de texto de um item de dados (vaga, curso ou negócio).
  const tr = useCallback(
    (type, item) => (lang === 'en' ? { ...item, ...dataEn[type]?.[item.id] } : item),
    [lang],
  )

  // Traduz categorias e tipos de vaga (o valor original em português continua sendo a chave).
  const label = useCallback(
    (group, value) => (lang === 'en' ? (dataEn[group]?.[value] ?? value) : value),
    [lang],
  )

  /* Acessibilidade */
  useEffect(() => {
    if (a11y) document.documentElement.dataset.a11y = 'on'
    else delete document.documentElement.dataset.a11y
  }, [a11y])

  const toggleA11y = () => {
    setA11y((v) => {
      write(KEYS.a11y, !v)
      return !v
    })
  }

  /* Favoritos */
  const isFavorite = (type, id) => favorites[type].includes(id)

  const toggleFavorite = (type, id) => {
    setFavorites((prev) => {
      const list = prev[type]
      const next = {
        ...prev,
        [type]: list.includes(id) ? list.filter((x) => x !== id) : [...list, id],
      }
      write(KEYS.favorites, next)
      return next
    })
  }

  const favoritesCount = favorites.jobs.length + favorites.courses.length

  /* Notificações de novas vagas: vagas dos últimos dias que ainda não foram vistas */
  const unreadJobs = useMemo(
    () =>
      jobs
        .filter((j) => ageInDays(j.publicadaEm) <= NEW_JOB_DAYS && !seen.includes(j.id))
        .sort((a, b) => a.publicadaEm.localeCompare(b.publicadaEm) * -1),
    [seen],
  )

  const markAllSeen = () => {
    const next = [...new Set([...seen, ...jobs.map((j) => j.id)])]
    setSeen(next)
    write(KEYS.seen, next)
  }

  const enableBrowserAlerts = async () => {
    if (!notificationsSupported()) return
    const result = await Notification.requestPermission()
    setPermission(result)
    const on = result === 'granted'
    setBrowserAlerts(on)
    write(KEYS.browser, on)
  }

  const disableBrowserAlerts = () => {
    setBrowserAlerts(false)
    write(KEYS.browser, false)
  }

  // Aviso do navegador para vagas novas (uma única vez por vaga).
  useEffect(() => {
    if (!browserAlerts || !notificationsSupported() || Notification.permission !== 'granted') return
    const pushed = read(KEYS.pushed, [])
    const fresh = unreadJobs.filter((j) => !pushed.includes(j.id))
    if (fresh.length === 0) return
    const first = tr('jobs', fresh[0]).cargo
    try {
      new Notification(t('notif.browserTitle'), {
        body: fresh.length === 1
          ? t('notif.browserBody.one', { first })
          : t('notif.browserBody.many', { n: fresh.length, first }),
        icon: '/favicon.svg',
      })
    } catch {
      /* alguns navegadores móveis exigem Service Worker */
    }
    write(KEYS.pushed, [...pushed, ...fresh.map((j) => j.id)])
  }, [browserAlerts, unreadJobs, t, tr])

  const value = {
    lang, toggleLang, t, tr, label,
    a11y, toggleA11y,
    favorites, isFavorite, toggleFavorite, favoritesCount,
    unreadJobs, markAllSeen,
    browserAlerts, permission, enableBrowserAlerts, disableBrowserAlerts,
  }

  return <FeaturesContext.Provider value={value}>{children}</FeaturesContext.Provider>
}
