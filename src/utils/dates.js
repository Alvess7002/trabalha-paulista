const pad = (n) => String(n).padStart(2, '0')

// Data local no formato AAAA-MM-DD, "n" dias antes de hoje (dados fictícios sempre recentes).
export function daysAgoISO(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function parseLocal(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

// Quantos dias se passaram desde a data (0 = hoje).
export function ageInDays(iso) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.round((today - parseLocal(iso)) / 86400000)
}

export const formatDate = (iso, lang) =>
  parseLocal(iso).toLocaleDateString(lang === 'en' ? 'en-US' : 'pt-BR')
