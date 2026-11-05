import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import FormField from '../components/FormField'
import { useAuth } from '../hooks/useAuth'
import { isValidEmail } from '../utils/validators'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [feedback, setFeedback] = useState(null)
  const notice = location.state?.notice

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = {}
    if (!isValidEmail(form.email)) next.email = 'Informe um e-mail válido.'
    if (!form.password) next.password = 'Informe a sua senha.'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    const result = login(form.email, form.password)
    if (!result.ok) {
      setFeedback({ type: 'error', text: result.message })
      return
    }
    setFeedback({ type: 'success', text: 'Acesso liberado! Redirecionando...' })
    setTimeout(() => navigate('/area-restrita'), 700)
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <span className="card-icon"><LogIn size={24} aria-hidden="true" /></span>
        <h1>Entrar</h1>
        <p className="muted">Acesse a sua área no Trabalha Paulista.</p>

        {notice && !feedback && <div className="alert alert-info" role="status">{notice}</div>}
        {feedback && (
          <div className={`alert alert-${feedback.type}`} role="status">{feedback.text}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <FormField label="E-mail" name="email" type="email" autoComplete="email"
            value={form.email} onChange={handleChange} error={errors.email} />
          <FormField label="Senha" name="password" type="password" autoComplete="current-password"
            value={form.password} onChange={handleChange} error={errors.password} />
          <button type="submit" className="btn btn-primary btn-block">Entrar</button>
        </form>

        <p className="auth-links">
          <Link to="/esqueci-senha">Esqueci minha senha</Link>
          <span>Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link></span>
        </p>
        <p className="muted auth-demo">Autenticação demonstrativa, sem segurança real.</p>
      </div>
    </section>
  )
}