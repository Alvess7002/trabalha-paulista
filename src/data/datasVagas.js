// Datas de publicação das vagas fictícias, em "dias atrás" (assim a demonstração nunca fica velha).
// Para fixar uma vaga, coloque o id dela aqui; vagas sem entrada recebem um valor calculado.
const DIAS_ATRAS = { 1: 2, 2: 0, 3: 6, 4: 12, 5: 25 }

const MS_POR_DIA = 24 * 60 * 60 * 1000

// Vagas publicadas pelo painel administrativo têm "publicadaEm" (data ISO) e usam o tempo real.
export const diasDesdePublicacao = (job) => {
  if (job.publicadaEm) {
    return Math.max(0, Math.floor((Date.now() - new Date(job.publicadaEm).getTime()) / MS_POR_DIA))
  }
  return job.diasAtras ?? DIAS_ATRAS[job.id] ?? (job.id * 5) % 30
}
