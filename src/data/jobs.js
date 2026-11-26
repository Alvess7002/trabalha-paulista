import { daysAgoISO } from '../utils/dates'

export const jobs = [
  { id: 1, publicadaEm: daysAgoISO(0), cargo: 'Auxiliar Administrativo', empresa: 'Comercial Beira-Mar', local: 'Centro, Paulista', tipo: 'CLT', categoria: 'Administração', descricao: 'Apoio às rotinas de escritório, atendimento e organização de documentos.' },
  { id: 2, publicadaEm: daysAgoISO(1), cargo: 'Atendente de Loja', empresa: 'Moda Paulista', local: 'Janga, Paulista', tipo: 'CLT', categoria: 'Comércio', descricao: 'Atendimento ao cliente, organização de vitrine e apoio ao caixa.' },
  { id: 3, publicadaEm: daysAgoISO(3), cargo: 'Assistente de Logística', empresa: 'Distribuidora Litoral', local: 'Artur Lundgren, Paulista', tipo: 'CLT', categoria: 'Logística', descricao: 'Conferência de pedidos, controle de estoque e apoio nas entregas.' },
  { id: 4, publicadaEm: daysAgoISO(6), cargo: 'Estagiário de TI', empresa: 'Tech Norte', local: 'Centro, Paulista', tipo: 'Estágio', categoria: 'Tecnologia', descricao: 'Suporte a usuários, manutenção de computadores e apoio à equipe.' },
  { id: 5, publicadaEm: daysAgoISO(15), cargo: 'Auxiliar de Cozinha', empresa: 'Restaurante Sabor da Praia', local: 'Pau Amarelo, Paulista', tipo: 'Temporário', categoria: 'Alimentação', descricao: 'Preparo de ingredientes, higienização e apoio ao cozinheiro.' },
]
