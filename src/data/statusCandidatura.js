// Status possíveis de uma candidatura, na ordem em que acontecem.
// "key" é o valor salvo; "tKey" é a chave de tradução do rótulo; "tone" escolhe a cor do selo.
export const STATUS_CANDIDATURA = [
  { key: 'enviada', tKey: 'status.enviada', tone: 'info' },
  { key: 'em_analise', tKey: 'status.em_analise', tone: 'warn' },
  { key: 'encerrada', tKey: 'status.encerrada', tone: 'neutral' },
]

export const STATUS_INICIAL = STATUS_CANDIDATURA[0].key

export const infoStatus = (key) =>
  STATUS_CANDIDATURA.find((s) => s.key === key) ?? STATUS_CANDIDATURA[0]

// Próximo status da sequência; null se já estiver encerrada.
export const proximoStatus = (key) => {
  const i = STATUS_CANDIDATURA.findIndex((s) => s.key === key)
  return STATUS_CANDIDATURA[i + 1]?.key ?? null
}
