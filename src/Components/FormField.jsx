import { useId, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  autoComplete,
  placeholder,
}) {
  const id = useId()
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="input-wrap">
        <input
          id={id}
          name={name}
          type={isPassword && visible ? 'text' : type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={error ? 'has-error' : undefined}
        />
        {isPassword && (
          <button
            type="button"
            className="toggle-visibility"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
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