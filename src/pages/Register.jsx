import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import FormField from '../components/FormField'
import { useAuth } from '../hooks/useAuth'
import { useFeatures } from '../hooks/useFeatures'
import { isValidEmail, isValidFullName, isValidPassword } from '../utils/validators'

export default function Register() {
  const { register } = useAuth()
  const { t } = useFeatures()
  const t2 = (key) => (key ? t(key) : undefined)
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [feedback, setFeedback] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = {}
    if (!isValidFullName(form.name)) next.name = 'err.name'
    if (!isValidEmail(form.email)) next.email = 'err.email'
    if (!isValidPassword(form.password)) next.password = 'err.passwordMin'
    if (form.confirm !== form.password) next.confirm = 'err.confirm'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    const result = register(form)
    if (!result.ok) {
      setFeedback({ type: 'error', text: result.message })
      return
    }
    navigate('/login', { state: { notice: 'login.registered' } })
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <span className="card-icon"><UserPlus size={24} aria-hidden="true" /></span>
        <h1>{t('register.title')}</h1>
        <p className="muted">{t('register.subtitle')}</p>

        {feedback && (
          <div className={`alert alert-${feedback.type}`} role="status">{t(feedback.text)}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <FormField label={t('form.name')} name="name" autoComplete="name"
            value={form.name} onChange={handleChange} error={t2(errors.name)} />
          <FormField label={t('form.email')} name="email" type="email" autoComplete="email"
            value={form.email} onChange={handleChange} error={t2(errors.email)} />
          <FormField label={t('form.password')} name="password" type="password" autoComplete="new-password"
            value={form.password} onChange={handleChange} error={t2(errors.password)} />
          <FormField label={t('form.confirm')} name="confirm" type="password" autoComplete="new-password"
            value={form.confirm} onChange={handleChange} error={t2(errors.confirm)} />
          <button type="submit" className="btn btn-primary btn-block">{t('register.submit')}</button>
        </form>

        <p className="auth-links">
          <span>{t('register.haveAccount')} <Link to="/login">{t('auth.login')}</Link></span>
        </p>
        <p className="muted auth-demo">
          {t('register.demo')}
        </p>
      </div>
    </section>
  )
}