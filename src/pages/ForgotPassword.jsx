import { useState } from 'react'
import { Link } from 'react-router-dom'
import { KeyRound } from 'lucide-react'
import FormField from '../components/FormField'
import { useFeatures } from '../hooks/useFeatures'
import { isValidEmail } from '../utils/validators'

export default function ForgotPassword() {
  const { t } = useFeatures()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValidEmail(email)) {
      setError('err.email')
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
        <h1>{t('forgot.title')}</h1>
        <p className="muted">{t('forgot.subtitle')}</p>

        {sent && (
          <div className="alert alert-success" role="status">
            {t('forgot.sent', { email: email.trim() })}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <FormField label={t('form.email')} name="email" type="email" autoComplete="email"
            value={email} onChange={(e) => setEmail(e.target.value)} error={error ? t(error) : undefined} />
          <button type="submit" className="btn btn-primary btn-block">{t('forgot.submit')}</button>
        </form>

        <p className="auth-links"><Link to="/login">{t('forgot.back')}</Link></p>
      </div>
    </section>
  )
}