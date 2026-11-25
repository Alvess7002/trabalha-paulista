import { useState } from 'react'
import { Mail } from 'lucide-react'
import PageHero from '../components/PageHero'
import FormField from '../components/FormField'
import { contactSubjects } from '../data/contactSubjects'
import { isValidEmail, isValidFullName, isValidMessage } from '../utils/validators'

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
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
    if (!isValidFullName(form.name)) next.name = 'Informe o nome completo (nome e sobrenome).'
    if (!isValidEmail(form.email)) next.email = 'Informe um e-mail válido.'
    if (!form.subject) next.subject = 'Selecione um assunto.'
    if (!isValidMessage(form.message)) next.message = 'Escreva uma mensagem com ao menos 10 caracteres.'
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
      <PageHero title="Entre em contato" subtitle="Tem alguma dúvida, sugestão ou deseja falar conosco? Envie sua mensagem." />
      <section className="auth-page">
        <div className="auth-card contact-card">
          <span className="card-icon"><Mail size={24} aria-hidden="true" /></span>
          <h2>Envie sua mensagem</h2>

          {sent && (
            <div className="alert alert-success" role="status">
              Mensagem enviada com sucesso! Obrigado pelo contato.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <FormField label="Nome completo" name="name" autoComplete="name"
              value={form.name} onChange={handleChange} error={errors.name} />
            <FormField label="E-mail" name="email" type="email" autoComplete="email"
              value={form.email} onChange={handleChange} error={errors.email} />
            <FormField label="Assunto" name="subject" as="select" placeholder="Selecione um assunto"
              options={contactSubjects} value={form.subject} onChange={handleChange} error={errors.subject} />
            <FormField label="Mensagem" name="message" as="textarea" placeholder="Digite sua mensagem..."
              maxLength={1000} value={form.message} onChange={handleChange} error={errors.message} />
            <button type="submit" className="btn btn-primary btn-block">Enviar mensagem</button>
          </form>

          <p className="muted auth-demo">
            Demonstração: não há backend, então a mensagem não é enviada nem armazenada.
          </p>
        </div>
      </section>
    </>
  )
}
