import { useCallback, useEffect, useMemo, useState } from 'react'
import { ContextoIdioma } from './contextoIdioma'
import { traducoes, mensagensConhecidas } from './traducoes'
import { traducoesDados } from './traducoesDados'

const KEY = 'tp_lang'
const IDIOMAS = ['pt', 'en']

function idiomaInicial() {
  try {
    const saved = localStorage.getItem(KEY)
    if (IDIOMAS.includes(saved)) return saved
  } catch {
    /* localStorage indisponível */
  }
  return 'pt'
}

export function ProvedorIdioma({ children }) {
  const [idioma, setIdioma] = useState(idiomaInicial)

  useEffect(() => {
    document.documentElement.lang = idioma === 'en' ? 'en' : 'pt-BR'
    document.title = traducoes[idioma]['meta.title']
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', traducoes[idioma]['meta.description'])
  }, [idioma])

  const alternarIdioma = useCallback(() => {
    setIdioma((current) => {
      const next = current === 'pt' ? 'en' : 'pt'
      try {
        localStorage.setItem(KEY, next)
      } catch {
        /* localStorage indisponível */
      }
      return next
    })
  }, [])

  const value = useMemo(() => {
    // t('chave', { nome: 'valor' }) -> texto no idioma atual, com {nome} substituído.
    const t = (key, params) => {
      const text = traducoes[idioma][key] ?? traducoes.pt[key] ?? key
      if (!params) return text
      return text.replace(/\{(\w+)\}/g, (_, name) => params[name] ?? `{${name}}`)
    }
    // td('texto em português') -> tradução de conteúdo dos dados; sem tradução, devolve o original.
    const td = (text) => (idioma === 'en' ? traducoesDados[text] ?? text : text)
    // tm('mensagem em português') -> tradução de mensagens vindas do AuthProvider.
    const tm = (message) => (idioma === 'en' ? mensagensConhecidas[message] ?? message : message)
    return { idioma, alternarIdioma, t, td, tm }
  }, [idioma, alternarIdioma])

  return <ContextoIdioma.Provider value={value}>{children}</ContextoIdioma.Provider>
}
