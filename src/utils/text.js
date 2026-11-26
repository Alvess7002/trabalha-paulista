// Normaliza texto para buscas: minúsculas, sem acentos e sem espaços nas pontas.
export const normalize = (value = '') =>
  String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()


// Formata uma data ISO (dia/mês/ano) conforme o idioma do site.
export const formatarData = (iso, idioma = 'pt') =>
  new Date(iso).toLocaleDateString(idioma === 'en' ? 'en-US' : 'pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
