import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Accessibility, Minus, Plus, RotateCcw, Square, Volume2, X } from 'lucide-react'
import { useIdioma } from '../idioma/useIdioma'
import {
  PADRAO,
  TAMANHOS,
  aplicar,
  carregar,
  salvar,
} from '../acessibilidade/preferencias'
import '../acessibilidade/acessibilidade.css'

const temVoz = typeof window !== 'undefined' && 'speechSynthesis' in window

// Divide o texto em trechos curtos: alguns navegadores interrompem falas muito longas.
function dividirTexto(texto) {
  const frases = texto.replace(/\s+/g, ' ').match(/[^.!?]+[.!?]*/g) || []
  const trechos = []
  let atual = ''
  for (const frase of frases) {
    if ((atual + frase).length > 200 && atual) {
      trechos.push(atual.trim())
      atual = ''
    }
    atual += frase
  }
  if (atual.trim()) trechos.push(atual.trim())
  return trechos
}

export default function PainelAcessibilidade() {
  const { t, idioma } = useIdioma()
  const { pathname } = useLocation()
  const [prefs, setPrefs] = useState(carregar)
  const [aberto, setAberto] = useState(false)
  const [lendo, setLendo] = useState(false)
  const botaoRef = useRef(null)
  const painelRef = useRef(null)

  const mudar = (parcial) => {
    const proximo = { ...prefs, ...parcial }
    setPrefs(proximo)
    salvar(proximo)
    aplicar(proximo)
  }

  const fechar = () => {
    setAberto(false)
    botaoRef.current?.focus()
  }

  const parar = () => {
    if (temVoz) window.speechSynthesis.cancel()
    setLendo(false)
  }

  const ler = () => {
    if (!temVoz) return
    window.speechSynthesis.cancel()
    const area = document.getElementById('conteudo')
    const trechos = dividirTexto(area ? area.innerText : '')
    if (trechos.length === 0) return
    trechos.forEach((trecho, i) => {
      const fala = new SpeechSynthesisUtterance(trecho)
      fala.lang = idioma === 'en' ? 'en-US' : 'pt-BR'
      if (i === trechos.length - 1) {
        fala.onend = () => setLendo(false)
        fala.onerror = () => setLendo(false)
      }
      window.speechSynthesis.speak(fala)
    })
    setLendo(true)
  }

  const restaurar = () => {
    parar()
    setPrefs({ ...PADRAO })
    salvar({ ...PADRAO })
    aplicar({ ...PADRAO })
  }

  // Ao abrir o painel, leva o foco para ele; Esc fecha; clique fora fecha.
  useEffect(() => {
    if (!aberto) return undefined
    painelRef.current?.focus()
    const aoTeclar = (e) => {
      if (e.key === 'Escape') {
        setAberto(false)
        botaoRef.current?.focus()
      }
    }
    const aoClicar = (e) => {
      if (
        !painelRef.current?.contains(e.target) &&
        !botaoRef.current?.contains(e.target)
      ) {
        setAberto(false)
      }
    }
    document.addEventListener('keydown', aoTeclar)
    document.addEventListener('mousedown', aoClicar)
    return () => {
      document.removeEventListener('keydown', aoTeclar)
      document.removeEventListener('mousedown', aoClicar)
    }
  }, [aberto])

  // Para a leitura ao trocar de página e ao sair do site.
  useEffect(() => {
    if (temVoz) window.speechSynthesis.cancel()
  }, [pathname])
  useEffect(
    () => () => {
      if (temVoz) window.speechSynthesis.cancel()
    },
    [],
  )

  // Função (e não componente) para o botão não ser recriado a cada clique e perder o foco.
  const chave = (campo, rotulo) => (
    <button
      key={campo}
      type="button"
      role="switch"
      aria-checked={prefs[campo]}
      className="acess-chave"
      onClick={() => mudar({ [campo]: !prefs[campo] })}
    >
      <span>{rotulo}</span>
      <span className="acess-chave-trilho" aria-hidden="true"><span /></span>
    </button>
  )

  const contrastes = [
    ['padrao', t('acess.contrastePadrao')],
    ['escuro', t('acess.contrasteEscuro')],
    ['claro', t('acess.contrasteClaro')],
  ]

  return (
    <div className="acess">
      <button
        ref={botaoRef}
        type="button"
        className="acess-botao"
        aria-expanded={aberto}
        aria-controls="acess-painel"
        aria-label={t('acess.abrir')}
        title={t('acess.titulo')}
        onClick={() => setAberto((v) => !v)}
      >
        <Accessibility size={28} aria-hidden="true" />
      </button>

      {aberto && (
        <div
          id="acess-painel"
          ref={painelRef}
          className="acess-painel"
          role="dialog"
          aria-label={t('acess.titulo')}
          tabIndex={-1}
        >
          <div className="acess-topo">
            <h2>{t('acess.titulo')}</h2>
            <button type="button" className="acess-fechar" onClick={fechar} aria-label={t('acess.fechar')}>
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <section aria-labelledby="acess-texto">
            <h3 id="acess-texto">{t('acess.texto')}</h3>
            <div className="acess-tamanho">
              <button
                type="button"
                onClick={() => mudar({ tamanho: prefs.tamanho - 1 })}
                disabled={prefs.tamanho === 0}
                aria-label={t('acess.diminuir')}
              >
                <Minus size={18} aria-hidden="true" />
              </button>
              <output aria-live="polite">{TAMANHOS[prefs.tamanho]}%</output>
              <button
                type="button"
                onClick={() => mudar({ tamanho: prefs.tamanho + 1 })}
                disabled={prefs.tamanho === TAMANHOS.length - 1}
                aria-label={t('acess.aumentar')}
              >
                <Plus size={18} aria-hidden="true" />
              </button>
            </div>
          </section>

          <section aria-labelledby="acess-contraste">
            <h3 id="acess-contraste">{t('acess.contraste')}</h3>
            <div className="acess-opcoes" role="group" aria-labelledby="acess-contraste">
              {contrastes.map(([valor, rotulo]) => (
                <button
                  key={valor}
                  type="button"
                  aria-pressed={prefs.contraste === valor}
                  onClick={() => mudar({ contraste: valor })}
                >
                  {rotulo}
                </button>
              ))}
            </div>
          </section>

          <section aria-labelledby="acess-leitura">
            <h3 id="acess-leitura">{t('acess.leitura')}</h3>
            {chave('fonteLeitura', t('acess.fonteLeitura'))}
            {chave('espacamento', t('acess.espacamento'))}
            {chave('links', t('acess.links'))}
          </section>

          <section aria-labelledby="acess-movimento">
            <h3 id="acess-movimento">{t('acess.movimento')}</h3>
            {chave('semAnimacao', t('acess.semAnimacao'))}
            {chave('cursorGrande', t('acess.cursorGrande'))}
          </section>

          <section aria-labelledby="acess-voz">
            <h3 id="acess-voz">{t('acess.voz')}</h3>
            {temVoz ? (
              <button
                type="button"
                className="acess-acao"
                onClick={lendo ? parar : ler}
              >
                {lendo ? <Square size={18} aria-hidden="true" /> : <Volume2 size={18} aria-hidden="true" />}
                {lendo ? t('acess.parar') : t('acess.lerPagina')}
              </button>
            ) : (
              <p className="muted">{t('acess.vozIndisponivel')}</p>
            )}
          </section>

          <button type="button" className="acess-acao acess-restaurar" onClick={restaurar}>
            <RotateCcw size={18} aria-hidden="true" /> {t('acess.restaurar')}
          </button>
        </div>
      )}
    </div>
  )
}
