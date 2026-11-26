// Datas de publicação das vagas fictícias, em "dias atrás" (assim a demonstração nunca fica velha).
// Para fixar uma vaga, coloque o id dela aqui; vagas sem entrada recebem um valor calculado.
const DIAS_ATRAS = { 1: 2, 2: 0, 3: 6, 4: 12, 5: 25 }

export const diasDesdePublicacao = (job) =>
  job.diasAtras ?? DIAS_ATRAS[job.id] ?? (job.id * 5) % 30
