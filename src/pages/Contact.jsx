import { useState } from 'react'
import { Mail } from 'lucide-react'
import PageHero from '../components/PageHero'
import FormField from '../components/FormField'
import { useFeatures } from '../hooks/useFeatures'
import { contactSubjects } from '../data/contactSubjects'
import { isValidEmail, isValidFullName, isValidMessage } from '../utils/validators'

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const { t } = useFeatures()
  const t2 = (key) => (key ? t(key) : undefined)
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setSent(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = {}
    if (!isValidFullName(form.name)) next.name = 'err.name'
    if (!isValidEmail(form.email)) next.email = 'err.email'
    if (!form.subject) next.subject = 'err.subject'
    if (!isValidMessage(form.message)) next.message = 'err.message'
    setErrors(next)
    if (Object.keys(next).length > 0) {
      setSent(false)
      return
    }

    // Versão demonstrativa: não há backend, então a mensagem não é enviada nem armazenada.
    setSent(true)
    setForm(EMPTY_FORM)
  }

  return (
    <>
      <PageHero title={t('contact.title')} subtitle={t('contact.subtitle')} />
      <section className="auth-page">
        <div className="auth-card contact-card">
          <span className="card-icon"><Mail size={24} aria-hidden="true" /></span>
          <h2>{t('contact.heading')}</h2>

          {sent && (
            <div className="alert alert-success" role="status">
              {t('contact.sent')}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <FormField label={t('form.name')} name="name" autoComplete="name"
              value={form.name} onChange={handleChange} error={t2(errors.name)} />
            <FormField label={t('form.email')} name="email" type="email" autoComplete="email"
              value={form.email} onChange={handleChange} error={t2(errors.email)} />
            <FormField label={t('contact.subject')} name="subject" as="select" placeholder={t('contact.subjectPh')}
              options={contactSubjects.map((s) => ({ value: s.value, label: t(`contact.s.${s.value}`) }))} value={form.subject} onChange={handleChange} error={t2(errors.subject)} />
            <FormField label={t('contact.message')} name="message" as="textarea" placeholder={t('contact.messagePh')}
              maxLength={1000} value={form.message} onChange={handleChange} error={t2(errors.message)} />
            <button type="submit" className="btn btn-primary btn-block">{t('contact.submit')}</button>
          </form>

          <p className="muted auth-demo">
            {t('contact.demo')}
          </p>
        </div>
      </section>
    </>
  )
}
