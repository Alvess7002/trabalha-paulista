// Normaliza texto para buscas: minúsculas, sem acentos e sem espaços nas pontas.
export const normalize = (value = '') =>
  String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
