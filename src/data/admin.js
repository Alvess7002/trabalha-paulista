// Quem se cadastra (ou entra) com um destes e-mails tem acesso ao painel administrativo.
// DEMONSTRATIVO: a checagem é feita no navegador, então não oferece segurança real.
// Em uma versão com backend, o papel de administrador deve vir do servidor.
export const ADMIN_EMAILS = ['admin@trabalhapaulista.com']

export const isAdminEmail = (email = '') => ADMIN_EMAILS.includes(email.trim().toLowerCase())
