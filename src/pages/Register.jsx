import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import FormField from '../components/FormField'
import { useAuth } from '../hooks/useAuth'
import { isValidEmail, isValidFullName, isValidPassword } from '../utils/validators'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [feedback, setFeedback] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = {}
    if (!isValidFullName(form.name)) next.name = 'Informe o nome completo (nome e sobrenome).'
    if (!isValidEmail(form.email)) next.email = 'Informe um e-mail válido.'
    if (!isValidPassword(form.password)) next.password = 'A senha deve ter ao menos 8 caracteres.'
    if (form.confirm !== form.password) next.confirm = 'As senhas não coincidem.'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    const result = register(form)
    if (!result.ok) {
      setFeedback({ type: 'error', text: result.message })
      return
    }
    navigate('/login', { state: { notice: 'Cadastro realizado! Entre com o seu e-mail e senha.' } })
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <span className="card-icon"><UserPlus size={24} aria-hidden="true" /></span>
        <h1>Criar conta</h1>
        <p className="muted">Cadastre-se para acessar a área restrita.</p>

        {feedback && (
          <div className={`alert alert-${feedback.type}`} role="status">{feedback.text}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <FormField label="Nome completo" name="name" autoComplete="name"
            value={form.name} onChange={handleChange} error={errors.name} />
          <FormField label="E-mail" name="email" type="email" autoComplete="email"
            value={form.email} onChange={handleChange} error={errors.email} />
          <FormField label="Senha" name="password" type="password" autoComplete="new-password"
            value={form.password} onChange={handleChange} error={errors.password} />
          <FormField label="Confirmar senha" name="confirm" type="password" autoComplete="new-password"
            value={form.confirm} onChange={handleChange} error={errors.confirm} />
          <button type="submit" className="btn btn-primary btn-block">Cadastrar</button>
        </form>

        <p className="auth-links">
          <span>Já tem conta? <Link to="/login">Entrar</Link></span>
        </p>
        <p className="muted auth-demo">
          Demonstração: os dados ficam apenas neste navegador (localStorage), sem criptografia.
          Não use uma senha real.
        </p>
      </div>
    </section>
  )
}