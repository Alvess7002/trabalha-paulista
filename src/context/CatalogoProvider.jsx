import { useMemo, useState } from 'react'
import { CatalogoContext } from './catalogoContext'
import { useAuth } from '../hooks/useAuth'
import { jobs as vagasPadrao } from '../data/jobs'
import { courses as cursosPadrao } from '../data/courses'
import { businesses as negociosPadrao } from '../data/businesses'

// Catálogo DEMONSTRATIVO de vagas, cursos e negócios: fica no localStorage do navegador.
// Começa com os dados de exemplo de src/data e passa a ser editável pelo painel administrativo.
// Cada item tem "publicado" (true/false): só os publicados aparecem nas páginas públicas.
const KEY = 'tp_demo_catalog'
const COLECOES = ['jobs', 'courses', 'businesses']

const proximoId = (lista) => Math.max(0, ...lista.map((i) => i.id)) + 1
const comoPublicados = (lista) => lista.map((item) => ({ ...item, publicado: true }))

function padrao() {
  const base = {
    jobs: comoPublicados(vagasPadrao),
    courses: comoPublicados(cursosPadrao),
    businesses: comoPublicados(negociosPadrao),
  }
  return { ...base, seq: Object.fromEntries(COLECOES.map((c) => [c, proximoId(base[c])])) }
}

function read() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY))
    if (data && COLECOES.every((c) => Array.isArray(data[c]))) {
      // O contador de ids nunca volta atrás: um id excluído não é reaproveitado,
      // senão candidaturas antigas passariam a apontar para uma vaga nova.
      const seq = Object.fromEntries(
        COLECOES.map((c) => [c, Math.max(data.seq?.[c] ?? 0, proximoId(data[c]))]),
      )
      return { ...data, seq }
    }
  } catch {
    /* dados ausentes ou corrompidos: volta ao padrão */
  }
  return padrao()
}

export function CatalogoProvider({ children }) {
  const { user } = useAuth()
  const [catalogo, setCatalogo] = useState(read)

  const persist = (next) => {
    setCatalogo(next)
    try {
      localStorage.setItem(KEY, JSON.stringify(next))
    } catch {
      /* localStorage indisponível: as alterações valem apenas nesta sessão */
    }
  }

  // Só o que está publicado (usado pelas páginas públicas).
  const publicados = useMemo(
    () => Object.fromEntries(COLECOES.map((c) => [c, catalogo[c].filter((i) => i.publicado)])),
    [catalogo],
  )

  const podeEditar = (colecao) => Boolean(user?.admin) && COLECOES.includes(colecao)

  // Cria (sem id) ou atualiza (com id) um item. "publicar" define se ele vai ao ar.
  const salvar = (colecao, dados, { id = null, publicar = false } = {}) => {
    if (!podeEditar(colecao)) return { ok: false, reason: 'auth' }
    const agora = new Date().toISOString()
    const lista = catalogo[colecao]
    let item
    let proxima
    let seq = catalogo.seq

    if (id !== null) {
      const atual = lista.find((i) => i.id === id)
      if (!atual) return { ok: false, reason: 'notfound' }
      item = { ...atual, ...dados, publicado: publicar }
      // A data de publicação da vaga é registrada quando ela vai ao ar.
      if (colecao === 'jobs' && publicar && !atual.publicado) item.publicadaEm = agora
      proxima = lista.map((i) => (i.id === id ? item : i))
    } else {
      item = { ...dados, id: seq[colecao], publicado: publicar }
      if (colecao === 'jobs' && publicar) item.publicadaEm = agora
      proxima = [...lista, item]
      seq = { ...seq, [colecao]: seq[colecao] + 1 }
    }

    persist({ ...catalogo, [colecao]: proxima, seq })
    return { ok: true, item }
  }

  const excluir = (colecao, id) => {
    if (!podeEditar(colecao)) return { ok: false, reason: 'auth' }
    persist({ ...catalogo, [colecao]: catalogo[colecao].filter((i) => i.id !== id) })
    return { ok: true }
  }

  const alternarPublicacao = (colecao, id) => {
    if (!podeEditar(colecao)) return { ok: false, reason: 'auth' }
    const agora = new Date().toISOString()
    let item = null
    const proxima = catalogo[colecao].map((i) => {
      if (i.id !== id) return i
      item = { ...i, publicado: !i.publicado }
      if (colecao === 'jobs' && item.publicado) item.publicadaEm = agora
      return item
    })
    if (!item) return { ok: false, reason: 'notfound' }
    persist({ ...catalogo, [colecao]: proxima })
    return { ok: true, item }
  }

  const restaurarPadrao = () => {
    if (!user?.admin) return { ok: false, reason: 'auth' }
    // Mantém os contadores de id, para não reaproveitar ids de itens já excluídos.
    const base = padrao()
    const seq = Object.fromEntries(
      COLECOES.map((c) => [c, Math.max(base.seq[c], catalogo.seq[c])]),
    )
    persist({ ...base, seq })
    return { ok: true }
  }

  return (
    <CatalogoContext.Provider
      value={{
        jobs: catalogo.jobs,
        courses: catalogo.courses,
        businesses: catalogo.businesses,
        publicados,
        salvar,
        excluir,
        alternarPublicacao,
        restaurarPadrao,
      }}
    >
      {children}
    </CatalogoContext.Provider>
  )
}
