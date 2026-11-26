import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Eye, EyeOff, Pencil, Plus, Save, Send, Trash2 } from 'lucide-react'
import FormField from '../components/FormField'
import InfoCard from '../components/InfoCard'
import { useCatalogo } from '../hooks/useCatalogo'
import { useIdioma } from '../idioma/useIdioma'

// Gerenciador de um tipo de conteúdo. Três etapas:
//   lista  -> formulário (cadastrar/editar) -> revisão (dados + pré-visualização) -> publicar/rascunho
export default function GerenciadorEntidade({ cfg }) {
  const { t, td } = useIdioma()
  const catalogo = useCatalogo()
  const items = catalogo[cfg.colecao]

  const vazio = () => Object.fromEntries(cfg.campos.map((c) => [c.name, '']))

  const [etapa, setEtapa] = useState('lista') // 'lista' | 'form' | 'revisao'
  const [editandoId, setEditandoId] = useState(null)
  const [form, setForm] = useState(vazio)
  const [errors, setErrors] = useState({})
  const [feedback, setFeedback] = useState(null) // { type, key, params }
  const [excluirId, setExcluirId] = useState(null)
  const tituloRef = useRef(null)

  // Ao trocar de etapa, leva o foco ao título (leitores de tela e teclado).
  useEffect(() => {
    if (etapa !== 'lista') tituloRef.current?.focus()
  }, [etapa])

  const editando = items.find((i) => i.id === editandoId) ?? null
  const what = t(cfg.whatKey)
  const err = (name) => (errors[name] ? t(...errors[name]) : undefined)

  const sugestoes = [...new Set(items.map((i) => i.categoria))].sort((a, b) => a.localeCompare(b, 'pt-BR'))

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const novo = () => {
    setForm(vazio())
    setEditandoId(null)
    setErrors({})
    setFeedback(null)
    setExcluirId(null)
    setEtapa('form')
  }

  const editar = (item) => {
    setForm(cfg.paraForm(item))
    setEditandoId(item.id)
    setErrors({})
    setFeedback(null)
    setExcluirId(null)
    setEtapa('form')
  }

  const cancelar = () => {
    setEtapa('lista')
    setEditandoId(null)
    setErrors({})
  }

  const revisar = (e) => {
    e.preventDefault()
    const found = cfg.validar(form)
    setErrors(found)
    if (Object.keys(found).length === 0) setEtapa('revisao')
  }

  const salvarItem = (publicar) => {
    const result = catalogo.salvar(cfg.colecao, cfg.deForm(form), { id: editandoId, publicar })
    if (!result.ok) {
      setFeedback({ type: 'error', key: 'admin.saveError' })
      return
    }
    setFeedback({
      type: 'success',
      key: publicar ? 'admin.saved.published' : 'admin.saved.draft',
      params: { name: cfg.nome(result.item) },
    })
    setEtapa('lista')
    setEditandoId(null)
  }

  const alternar = (item) => {
    const result = catalogo.alternarPublicacao(cfg.colecao, item.id)
    if (!result.ok) return
    setFeedback({
      type: 'success',
      key: result.item.publicado ? 'admin.saved.published' : 'admin.unpublished',
      params: { name: cfg.nome(item) },
    })
  }

  const excluir = (item) => {
    const result = catalogo.excluir(cfg.colecao, item.id)
    setExcluirId(null)
    if (result.ok) {
      setFeedback({ type: 'success', key: 'admin.deleted', params: { name: cfg.nome(item) } })
    }
  }

  const valorLegivel = (campo) => {
    const valor = form[campo.name]
    return campo.translate ? td(valor) : valor
  }

  const previa = cfg.card(cfg.deForm(form), td)

  // ---------- Etapa: formulário ----------
  if (etapa === 'form') {
    return (
      <div className="admin-form">
        <h2 ref={tituloRef} tabIndex={-1}>
          {t(editandoId === null ? 'admin.form.newTitle' : 'admin.form.editTitle', { what })}
        </h2>
        <p className="muted">{t('admin.form.hint')}</p>
        <form onSubmit={revisar} noValidate>
          {cfg.campos.map((c) => (
            <FormField
              key={c.name}
              label={t(c.labelKey)}
              name={c.name}
              as={c.as}
              type={c.type}
              placeholder={c.placeholderKey ? t(c.placeholderKey) : undefined}
              options={c.options?.map((o) => ({ value: o, label: c.translate ? td(o) : o }))}
              suggestions={c.suggest ? sugestoes : undefined}
              maxLength={c.maxLength}
              value={form[c.name]}
              onChange={handleChange}
              error={err(c.name)}
            />
          ))}
          <div className="admin-actions">
            <button type="button" className="btn btn-outline" onClick={cancelar}>
              {t('admin.cancel')}
            </button>
            <button type="submit" className="btn btn-primary">
              <Eye size={18} aria-hidden="true" /> {t('admin.form.review')}
            </button>
          </div>
        </form>
      </div>
    )
  }

  // ---------- Etapa: revisão ----------
  if (etapa === 'revisao') {
    const jaPublicado = Boolean(editando?.publicado)
    return (
      <div className="admin-review">
        <h2 ref={tituloRef} tabIndex={-1}>{t('admin.review.title')}</h2>
        <p className="muted">{t('admin.review.intro')}</p>

        <div className="review-grid">
          <section aria-labelledby={`dados-${cfg.colecao}`}>
            <h3 id={`dados-${cfg.colecao}`}>{t('admin.review.data')}</h3>
            <dl className="review-list">
              {cfg.campos.map((c) => (
                <div key={c.name} className="review-row">
                  <dt>{t(c.labelKey)}</dt>
                  <dd>{valorLegivel(c)}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby={`previa-${cfg.colecao}`}>
            <h3 id={`previa-${cfg.colecao}`}>{t('admin.review.preview')}</h3>
            <InfoCard {...previa} />
          </section>
        </div>

        <div className="admin-actions">
          <button type="button" className="btn btn-outline" onClick={() => setEtapa('form')}>
            <ArrowLeft size={18} aria-hidden="true" /> {t('admin.review.back')}
          </button>
          <button type="button" className="btn btn-outline" onClick={() => salvarItem(false)}>
            <Save size={18} aria-hidden="true" /> {t('admin.review.draft')}
          </button>
          <button type="button" className="btn btn-primary" onClick={() => salvarItem(true)}>
            <Send size={18} aria-hidden="true" /> {t(jaPublicado ? 'admin.review.update' : 'admin.review.publish')}
          </button>
        </div>
      </div>
    )
  }

  // ---------- Etapa: lista ----------
  return (
    <div>
      <div className="admin-toolbar">
        <p className="muted" aria-live="polite">
          {items.length === 1 ? t('admin.countOne') : t('admin.count', { count: items.length })}
        </p>
        <button type="button" className="btn btn-primary" onClick={novo}>
          <Plus size={18} aria-hidden="true" /> {t(cfg.newKey)}
        </button>
      </div>

      <div role="status" aria-live="polite">
        {feedback && (
          <div className={`alert alert-${feedback.type}`}>{t(feedback.key, feedback.params)}</div>
        )}
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <h3>{t('admin.empty.title')}</h3>
          <p className="muted">{t('admin.empty.text')}</p>
        </div>
      ) : (
        <ul className="admin-list">
          {items.map((item) => {
            const nome = cfg.nome(item)
            return (
              <li key={item.id} className="admin-item">
                <div className="admin-item-main">
                  <h3>{nome}</h3>
                  <p className="muted">{cfg.subtitulo(item)}</p>
                </div>
                <span className={`status-badge ${item.publicado ? 'status-ok' : 'status-warn'}`}>
                  {t(item.publicado ? 'admin.status.published' : 'admin.status.draft')}
                </span>

                {excluirId === item.id ? (
                  <div className="admin-confirm" role="alertdialog" aria-label={t('admin.deleteConfirm', { name: nome })}>
                    <p>{t('admin.deleteConfirm', { name: nome })}</p>
                    <div className="admin-item-actions">
                      <button type="button" className="btn btn-danger btn-sm" onClick={() => excluir(item)}>
                        <Trash2 size={16} aria-hidden="true" /> {t('admin.deleteYes')}
                      </button>
                      <button type="button" className="btn btn-outline btn-sm" onClick={() => setExcluirId(null)}>
                        {t('admin.cancel')}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="admin-item-actions">
                    <button type="button" className="btn btn-outline btn-sm" aria-label={t('admin.editAria', { name: nome })} onClick={() => editar(item)}>
                      <Pencil size={16} aria-hidden="true" /> {t('admin.edit')}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      aria-label={t(item.publicado ? 'admin.unpublishAria' : 'admin.publishAria', { name: nome })}
                      onClick={() => alternar(item)}
                    >
                      {item.publicado ? <EyeOff size={16} aria-hidden="true" /> : <Send size={16} aria-hidden="true" />}{' '}
                      {t(item.publicado ? 'admin.unpublish' : 'admin.publish')}
                    </button>
                    <button type="button" className="btn btn-outline btn-sm btn-outline-danger" aria-label={t('admin.deleteAria', { name: nome })} onClick={() => setExcluirId(item.id)}>
                      <Trash2 size={16} aria-hidden="true" /> {t('admin.delete')}
                    </button>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
