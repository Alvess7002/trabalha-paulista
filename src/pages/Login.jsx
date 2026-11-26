import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import FormField from '../components/FormField'
import { useAuth } from '../hooks/useAuth'
import { useIdioma } from '../idioma/useIdioma'
import { isValidEmail } from '../utils/validators'

export default function Login() {
  const { login } = useAuth()
  const { t, tm } = useIdioma()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  // Os erros guardam a chave do texto, para trocarem de idioma junto com o site.
  const [errors, setErrors] = useState({})
  const [feedback, setFeedback] = useState(null)
  const notice = location.state?.noticeKey ? t(location.state.noticeKey) : location.state?.notice
  const err = (key) => (key ? t(key) : undefined)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = {}
    if (!isValidEmail(form.email)) next.email = 'err.email'
    if (!form.password) next.password = 'err.passwordRequired'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    const result = login(form.email, form.password)
    if (!result.ok) {
      setFeedback({ type: 'error', message: result.message })
      return
    }
    setFeedback({ type: 'success', key: 'login.success' })
    setTimeout(() => navigate(location.state?.from ?? '/area-restrita'), 700)
  }

  const feedbackText = feedback && (feedback.key ? t(feedback.key) : tm(feedback.message))

  return (
    <section className="auth-page">
      <div className="auth-card">
        <span className="card-icon"><LogIn size={24} aria-hidden="true" /></span>
        <h1>{t('login.title')}</h1>
        <p className="muted">{t('login.subtitle')}</p>

        {notice && !feedback && <div className="alert alert-info" role="status">{notice}</div>}
        {feedback && (
          <div className={`alert alert-${feedback.type}`} role="status">{feedbackText}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <FormField label={t('field.email')} name="email" type="email" autoComplete="email"
            value={form.email} onChange={handleChange} error={err(errors.email)} />
          <FormField label={t('field.password')} name="password" type="password" autoComplete="current-password"
            value={form.password} onChange={handleChange} error={err(errors.password)} />
          <button type="submit" className="btn btn-primary btn-block">{t('login.submit')}</button>
        </form>

        <p className="auth-links">
          <Link to="/esqueci-senha">{t('login.forgot')}</Link>
          <span>{t('login.noAccount')} <Link to="/cadastro">{t('login.signUp')}</Link></span>
        </p>
        <p className="muted auth-demo">{t('login.demo')}</p>
      </div>
    </section>
  )
}
