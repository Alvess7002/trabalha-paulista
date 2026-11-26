// Preferências de acessibilidade: guardadas no navegador e aplicadas na tag <html>.
// O CSS correspondente está em acessibilidade.css.
const CHAVE = 'tp_acessibilidade'

export const TAMANHOS = [100, 115, 130, 150] // % do tamanho de texto padrão do navegador
export const CONTRASTES = ['padrao', 'escuro', 'claro']

export const PADRAO = {
  tamanho: 0, // posição em TAMANHOS
  contraste: 'padrao',
  fonteLeitura: false,
  espacamento: false,
  links: false,
  semAnimacao: false,
  cursorGrande: false,
}

export function carregar() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE))
    const prefs = { ...PADRAO, ...salvo }
    if (!Number.isInteger(prefs.tamanho) || prefs.tamanho < 0 || prefs.tamanho >= TAMANHOS.length) {
      prefs.tamanho = PADRAO.tamanho
    }
    if (!CONTRASTES.includes(prefs.contraste)) prefs.contraste = PADRAO.contraste
    return prefs
  } catch {
    return { ...PADRAO }
  }
}

export function salvar(prefs) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(prefs))
  } catch {
    /* localStorage indisponível */
  }
}

function marcar(el, nome, ligado) {
  if (ligado) el.setAttribute(nome, '1')
  else el.removeAttribute(nome)
}

export function aplicar(prefs) {
  const el = document.documentElement
  if (prefs.tamanho === 0) el.style.removeProperty('font-size')
  else el.style.fontSize = `${TAMANHOS[prefs.tamanho]}%`

  if (prefs.contraste === 'padrao') el.removeAttribute('data-a11y-contraste')
  else el.setAttribute('data-a11y-contraste', prefs.contraste)

  marcar(el, 'data-a11y-fonte', prefs.fonteLeitura)
  marcar(el, 'data-a11y-espaco', prefs.espacamento)
  marcar(el, 'data-a11y-links', prefs.links)
  marcar(el, 'data-a11y-sem-animacao', prefs.semAnimacao)
  marcar(el, 'data-a11y-cursor', prefs.cursorGrande)
  el.setAttribute('data-a11y-tamanho', String(prefs.tamanho))
}

// Aplica as preferências salvas assim que o site carrega, antes da primeira tela.
aplicar(carregar())
