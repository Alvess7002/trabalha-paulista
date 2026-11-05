import { Briefcase } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <strong className="footer-brand">
            <Briefcase size={20} aria-hidden="true" /> Trabalha Paulista
          </strong>
          <p>Empregabilidade, capacitação e empreendedorismo local em Paulista–PE.</p>
        </div>
        <p className="footer-note">Projeto acadêmico · Versão demonstrativa com dados fictícios.</p>
      </div>
    </footer>
  )
}