import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import PageHero from '../components/PageHero'
import GerenciadorEntidade from '../admin/GerenciadorEntidade'
import { ENTIDADES, ORDEM_ENTIDADES } from '../admin/entidades'
import { useCatalogo } from '../hooks/useCatalogo'
import { useIdioma } from '../idioma/useIdioma'

export default function Admin() {
  const { t } = useIdioma()
  const { restaurarPadrao } = useCatalogo()
  const [aba, setAba] = useState(ORDEM_ENTIDADES[0])
  const [confirmarReset, setConfirmarReset] = useState(false)
  const [resetFeito, setResetFeito] = useState(false)
  const abasRef = useRef({})

  // Navegação por teclado nas abas: setas, Home e End.
  const handleKeyDown = (e) => {
    const i = ORDEM_ENTIDADES.indexOf(aba)
    let next = null
    if (e.key === 'ArrowRight') next = (i + 1) % ORDEM_ENTIDADES.length
    else if (e.key === 'ArrowLeft') next = (i - 1 + ORDEM_ENTIDADES.length) % ORDEM_ENTIDADES.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = ORDEM_ENTIDADES.length - 1
    if (next === null) return
    e.preventDefault()
    const key = ORDEM_ENTIDADES[next]
    setAba(key)
    abasRef.current[key]?.focus()
  }

  const resetar = () => {
    restaurarPadrao()
    setConfirmarReset(false)
    setResetFeito(true)
  }

  return (
    <>
      <PageHero title={t('admin.title')} subtitle={t('admin.subtitle')} />

      <section className="container section admin-page">
        <Link to="/area-restrita" className="card-link admin-back">
          <ArrowLeft size={16} aria-hidden="true" /> {t('admin.back')}
        </Link>
        <p className="notice">{t('admin.demoNote')}</p>

        <div className="admin-tabs" role="tablist" aria-label={t('admin.tabsLabel')} onKeyDown={handleKeyDown}>
          {ORDEM_ENTIDADES.map((key) => (
            <button
              key={key}
              ref={(el) => { abasRef.current[key] = el }}
              type="button"
              role="tab"
              id={`aba-${key}`}
              aria-selected={aba === key}
              aria-controls={`painel-${key}`}
              tabIndex={aba === key ? 0 : -1}
              className="admin-tab"
              onClick={() => setAba(key)}
            >
              {t(ENTIDADES[key].tabKey)}
            </button>
          ))}
        </div>

        {/* Os três painéis ficam montados (apenas ocultos), para não perder um formulário em andamento. */}
        {ORDEM_ENTIDADES.map((key) => (
          <div key={key} role="tabpanel" id={`painel-${key}`} aria-labelledby={`aba-${key}`} hidden={aba !== key}>
            <GerenciadorEntidade cfg={ENTIDADES[key]} />
          </div>
        ))}

        <div className="admin-reset">
          <div role="status" aria-live="polite">
            {resetFeito && <div className="alert alert-success">{t('admin.resetDone')}</div>}
          </div>
          {confirmarReset ? (
            <div className="admin-confirm" role="alertdialog" aria-label={t('admin.resetConfirm')}>
              <p>{t('admin.resetConfirm')}</p>
              <div className="admin-item-actions">
                <button type="button" className="btn btn-danger btn-sm" onClick={resetar}>
                  {t('admin.resetYes')}
                </button>
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setConfirmarReset(false)}>
                  {t('admin.cancel')}
                </button>
              </div>
            </div>
          ) : (
            <button type="button" className="btn btn-outline btn-sm" onClick={() => { setResetFeito(false); setConfirmarReset(true) }}>
              <RotateCcw size={16} aria-hidden="true" /> {t('admin.reset')}
            </button>
          )}
        </div>
      </section>
    </>
  )
}
