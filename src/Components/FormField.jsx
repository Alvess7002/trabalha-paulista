import { useId, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useFeatures } from '../hooks/useFeatures'

export default function FormField({
  label,
  name,
  type = 'text',
  as = 'input', // 'input' | 'textarea' | 'select'
  options = [], // usado apenas quando as="select": [{ value, label }]
  rows = 5, // usado apenas quando as="textarea"
  value,
  onChange,
  error,
  autoComplete,
  placeholder,
  maxLength,
}) {
  const id = useId()
  const { t } = useFeatures()
  const [visible, setVisible] = useState(false)
  const isPassword = as === 'input' && type === 'password'

  const shared = {
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
      <select {...shared}>
        <option value="">{placeholder ?? t('form.select')}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )
  } else if (as === 'textarea') {
    control = (
      <textarea {...shared} rows={rows} placeholder={placeholder} maxLength={maxLength} />
    )
  } else {
    control = (
      <input
        {...shared}
        type={isPassword && visible ? 'text' : type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        maxLength={maxLength}
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
            aria-label={visible ? t('form.hidePassword') : t('form.showPassword')}
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
