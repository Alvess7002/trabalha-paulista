// Remove acentos e ignora maiúsculas/minúsculas, para que "logistica" encontre "Logística".
export const normalize = (value) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
