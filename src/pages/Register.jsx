import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import FormField from '../components/FormField'
import { useAuth } from '../hooks/useAuth'
import { useIdioma } from '../idioma/useIdioma'
import { isValidEmail, isValidFullName, isValidPassword } from '../utils/validators'

export default function Register() {
  const { register } = useAuth()
  const { t, tm } = useIdioma()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  // Os erros guardam a chave do texto, para trocarem de idioma junto com o site.
  const [errors, setErrors] = useState({})
  const [feedback, setFeedback] = useState(null)
  const err = (key) => (key ? t(key) : undefined)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = {}
    if (!isValidFullName(form.name)) next.name = 'err.name'
    if (!isValidEmail(form.email)) next.email = 'err.email'
    if (!isValidPassword(form.password)) next.password = 'err.passwordLength'
    if (form.confirm !== form.password) next.confirm = 'err.confirm'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    const result = register(form)
    if (!result.ok) {
      setFeedback({ type: 'error', message: result.message })
      return
    }
    navigate('/login', { state: { noticeKey: 'register.done' } })
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <span className="card-icon"><UserPlus size={24} aria-hidden="true" /></span>
        <h1>{t('register.title')}</h1>
        <p className="muted">{t('register.subtitle')}</p>

        {feedback && (
          <div className={`alert alert-${feedback.type}`} role="status">{tm(feedback.message)}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <FormField label={t('field.name')} name="name" autoComplete="name"
            value={form.name} onChange={handleChange} error={err(errors.name)} />
          <FormField label={t('field.email')} name="email" type="email" autoComplete="email"
            value={form.email} onChange={handleChange} error={err(errors.email)} />
          <FormField label={t('field.password')} name="password" type="password" autoComplete="new-password"
            value={form.password} onChange={handleChange} error={err(errors.password)} />
          <FormField label={t('field.confirm')} name="confirm" type="password" autoComplete="new-password"
            value={form.confirm} onChange={handleChange} error={err(errors.confirm)} />
          <button type="submit" className="btn btn-primary btn-block">{t('register.submit')}</button>
        </form>

        <p className="auth-links">
          <span>{t('register.haveAccount')} <Link to="/login">{t('register.signIn')}</Link></span>
        </p>
        <p className="muted auth-demo">{t('register.demo')}</p>
      </div>
    </section>
  )
}
