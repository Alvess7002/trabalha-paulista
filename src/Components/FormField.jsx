import { useId, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useIdioma } from '../idioma/useIdioma'

// Campo de formulário: input (inclusive senha, com mostrar/ocultar), select ou textarea.
export default function FormField({
  label,
  name,
  as = 'input',
  type = 'text',
  value,
  onChange,
  error,
  autoComplete,
  placeholder,
  options = [],
  maxLength,
}) {
  const id = useId()
  const { t } = useIdioma()
  const [visible, setVisible] = useState(false)
  const isPassword = as === 'input' && type === 'password'

  const common = {
    id,
    name,
    value,
    onChange,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? `${id}-error` : undefined,
    className: error ? 'has-error' : undefined,
  }

  let control
  if (as === 'select') {
    control = (
      <select {...common}>
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    )
  } else if (as === 'textarea') {
    control = (
      <textarea {...common} rows={5} maxLength={maxLength} placeholder={placeholder} />
    )
  } else {
    control = (
      <input
        {...common}
        type={isPassword && visible ? 'text' : type}
        autoComplete={autoComplete}
        placeholder={placeholder}
      />
    )
  }

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="input-wrap">
        {control}
        {isPassword && (
          <button
            type="button"
            className="toggle-visibility"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? t('field.hidePassword') : t('field.showPassword')}
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <span id={`${id}-error`} className="field-error" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
