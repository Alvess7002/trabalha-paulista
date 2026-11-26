import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function InfoCard({
  icon: Icon,
  title,
  subtitle,
  badge,
  meta,
  metaIcon: MetaIcon,
  description,
  to,
  linkLabel,
  className = '',
}) {
  return (
    <article className={`card ${className}`.trim()}>
      {Icon && (
        <span className="card-icon">
          <Icon size={24} aria-hidden="true" />
        </span>
      )}
      {badge && <span className="badge">{badge}</span>}
      <div className="card-title-row">
        <h3>{title}</h3>
      </div>
      {subtitle && <p className="card-subtitle">{subtitle}</p>}
      {meta && (
        <p className="card-meta">
          {MetaIcon && <MetaIcon size={16} aria-hidden="true" />} {meta}
        </p>
      )}
      <p className="muted">{description}</p>
      {to && (
        <Link to={to} className="card-link">
          {linkLabel} <ArrowRight size={16} aria-hidden="true" />
        </Link>
      )}
    </article>
  )
}
