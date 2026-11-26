import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import FormField from '../components/FormField'
import { useAuth } from '../hooks/useAuth'
import { useFeatures } from '../hooks/useFeatures'
import { isValidEmail } from '../utils/validators'

export default function Login() {
  const { login } = useAuth()
  const { t } = useFeatures()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [feedback, setFeedback] = useState(null)
  const notice = location.state?.notice
  const t2 = (key) => (key ? t(key) : undefined)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = {}
    if (!isValidEmail(form.email)) next.email = 'err.email'
    if (!form.password) next.password = 'err.passwordLogin'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    const result = login(form.email, form.password)
    if (!result.ok) {
      setFeedback({ type: 'error', text: result.message })
      return
    }
    setFeedback({ type: 'success', text: 'login.success' })
    setTimeout(() => navigate('/area-restrita'), 700)
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <span className="card-icon"><LogIn size={24} aria-hidden="true" /></span>
        <h1>{t('login.title')}</h1>
        <p className="muted">{t('login.subtitle')}</p>

        {notice && !feedback && <div className="alert alert-info" role="status">{t(notice)}</div>}
        {feedback && (
          <div className={`alert alert-${feedback.type}`} role="status">{t(feedback.text)}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <FormField label={t('form.email')} name="email" type="email" autoComplete="email"
            value={form.email} onChange={handleChange} error={t2(errors.email)} />
          <FormField label={t('form.password')} name="password" type="password" autoComplete="current-password"
            value={form.password} onChange={handleChange} error={t2(errors.password)} />
          <button type="submit" className="btn btn-primary btn-block">{t('auth.login')}</button>
        </form>

        <p className="auth-links">
          <Link to="/esqueci-senha">{t('login.forgot')}</Link>
          <span>{t('login.noAccount')} <Link to="/cadastro">{t('login.signup')}</Link></span>
        </p>
        <p className="muted auth-demo">{t('login.demo')}</p>
      </div>
    </section>
  )
}