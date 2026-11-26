export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

export const isValidFullName = (value) => {
  const name = value.trim()
  return name.length >= 5 && name.split(/\s+/).length >= 2
}

export const isValidPassword = (value) => value.length >= 8

export const isValidMessage = (value) => value.trim().length >= 10
