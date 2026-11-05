import { useState } from 'react'
import { Link } from 'react-router-dom'
import { KeyRound } from 'lucide-react'
import FormField from '../components/FormField'
import { isValidEmail } from '../utils/validators'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValidEmail(email)) {
      setError('Informe um e-mail válido.')
      setSent(false)
      return
    }
    setError('')
    setSent(true)
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <span className="card-icon"><KeyRound size={24} aria-hidden="true" /></span>
        <h1>Recuperar senha</h1>
        <p className="muted">Informe o e-mail da sua conta.</p>

        {sent && (
          <div className="alert alert-success" role="status">
            Solicitação registrada para {email.trim()}. (Simulação: nenhum e-mail foi enviado.)
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <FormField label="E-mail" name="email" type="email" autoComplete="email"
            value={email} onChange={(e) => setEmail(e.target.value)} error={error} />
          <button type="submit" className="btn btn-primary btn-block">Solicitar recuperação</button>
        </form>

        <p className="auth-links"><Link to="/login">Voltar para o login</Link></p>
      </div>
    </section>
  )
}