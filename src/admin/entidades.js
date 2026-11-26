import { Briefcase, Clock, GraduationCap, MapPin, Store } from 'lucide-react'

// Descrição de cada tipo de conteúdo gerenciável no painel administrativo.
// O gerenciador (GerenciadorEntidade) é genérico e lê tudo daqui: campos do formulário,
// validação, conversão entre formulário e item salvo e o card de pré-visualização.

const TIPOS_VAGA = ['CLT', 'Estágio', 'Temporário', 'Aprendiz', 'PJ']
const MODALIDADES = ['Presencial', 'Online', 'Híbrido']

// Erros são [chaveDeTraducao, parametros], assim trocam de idioma junto com o site.
function texto(errors, form, name, min) {
  const valor = String(form[name] ?? '').trim()
  if (!valor) errors[name] = ['admin.err.required']
  else if (valor.length < min) errors[name] = ['admin.err.short', { min }]
}

function escolha(errors, form, name) {
  if (!String(form[name] ?? '').trim()) errors[name] = ['admin.err.required']
}

const aparar = (form, nomes) =>
  Object.fromEntries(nomes.map((n) => [n, String(form[n] ?? '').trim()]))

const paraForm = (campos, item) =>
  Object.fromEntries(campos.map((c) => [c.name, String(item[c.name] ?? '')]))

// Cursos antigos guardam só "40 horas · Presencial"; aqui separamos em horas e modalidade.
function lerDuracao(duracao = '') {
  const m = /^(\d+)\s*horas?\s*·\s*(.+)$/.exec(duracao)
  return m ? { horas: m[1], modalidade: m[2].trim() } : { horas: '', modalidade: '' }
}

const camposVaga = [
  { name: 'cargo', labelKey: 'admin.f.cargo', maxLength: 80 },
  { name: 'empresa', labelKey: 'admin.f.empresa', maxLength: 80 },
  { name: 'categoria', labelKey: 'admin.f.categoria', maxLength: 40, suggest: true },
  { name: 'tipo', labelKey: 'admin.f.tipo', as: 'select', placeholderKey: 'admin.p.tipo', options: TIPOS_VAGA, translate: true },
  { name: 'local', labelKey: 'admin.f.local', placeholderKey: 'admin.p.local', maxLength: 80 },
  { name: 'descricao', labelKey: 'admin.f.descricao', as: 'textarea', maxLength: 300 },
]

const camposCurso = [
  { name: 'nome', labelKey: 'admin.f.nome', maxLength: 80 },
  { name: 'categoria', labelKey: 'admin.f.categoria', maxLength: 40, suggest: true },
  { name: 'horas', labelKey: 'admin.f.horas', type: 'number', maxLength: 3 },
  { name: 'modalidade', labelKey: 'admin.f.modalidade', as: 'select', placeholderKey: 'admin.p.modalidade', options: MODALIDADES, translate: true },
  { name: 'descricao', labelKey: 'admin.f.descricao', as: 'textarea', maxLength: 300 },
]

const camposNegocio = [
  { name: 'nome', labelKey: 'admin.f.nome', maxLength: 80 },
  { name: 'categoria', labelKey: 'admin.f.categoria', maxLength: 40, suggest: true },
  { name: 'bairro', labelKey: 'admin.f.bairro', maxLength: 60 },
  { name: 'descricao', labelKey: 'admin.f.descricao', as: 'textarea', maxLength: 300 },
]

export const ENTIDADES = {
  jobs: {
    colecao: 'jobs',
    tabKey: 'admin.tab.jobs',
    whatKey: 'admin.what.jobs',
    newKey: 'admin.new.jobs',
    campos: camposVaga,
    nome: (item) => item.cargo,
    subtitulo: (item) => `${item.empresa} · ${item.local}`,
    validar(form) {
      const e = {}
      texto(e, form, 'cargo', 3)
      texto(e, form, 'empresa', 2)
      texto(e, form, 'categoria', 3)
      escolha(e, form, 'tipo')
      texto(e, form, 'local', 3)
      texto(e, form, 'descricao', 20)
      return e
    },
    paraForm: (item) => paraForm(camposVaga, item),
    deForm: (form) => aparar(form, camposVaga.map((c) => c.name)),
    card: (item, td) => ({
      icon: Briefcase,
      badge: td(item.tipo),
      title: td(item.cargo),
      subtitle: item.empresa,
      meta: item.local,
      metaIcon: MapPin,
      description: td(item.descricao),
    }),
  },

  courses: {
    colecao: 'courses',
    tabKey: 'admin.tab.courses',
    whatKey: 'admin.what.courses',
    newKey: 'admin.new.courses',
    campos: camposCurso,
    nome: (item) => item.nome,
    subtitulo: (item) => item.duracao,
    validar(form) {
      const e = {}
      texto(e, form, 'nome', 3)
      texto(e, form, 'categoria', 3)
      const horas = Number(form.horas)
      if (!String(form.horas ?? '').trim() || !Number.isInteger(horas) || horas < 1 || horas > 999) {
        e.horas = ['admin.err.hours']
      }
      escolha(e, form, 'modalidade')
      texto(e, form, 'descricao', 20)
      return e
    },
    paraForm: (item) => ({
      ...paraForm(camposCurso, item),
      ...(item.horas ? { horas: String(item.horas), modalidade: item.modalidade ?? '' } : lerDuracao(item.duracao)),
    }),
    deForm(form) {
      const dados = aparar(form, ['nome', 'categoria', 'modalidade', 'descricao'])
      const horas = Number(form.horas)
      return {
        ...dados,
        horas,
        // "duracao" é o texto exibido na página pública (mesmo formato dos cursos de exemplo).
        duracao: `${horas} ${horas === 1 ? 'hora' : 'horas'} · ${dados.modalidade}`,
      }
    },
    card: (item, td) => ({
      icon: GraduationCap,
      badge: td(item.categoria),
      title: td(item.nome),
      meta: td(item.duracao),
      metaIcon: Clock,
      description: td(item.descricao),
    }),
  },

  businesses: {
    colecao: 'businesses',
    tabKey: 'admin.tab.businesses',
    whatKey: 'admin.what.businesses',
    newKey: 'admin.new.businesses',
    campos: camposNegocio,
    nome: (item) => item.nome,
    subtitulo: (item) => item.bairro,
    validar(form) {
      const e = {}
      texto(e, form, 'nome', 3)
      texto(e, form, 'categoria', 3)
      texto(e, form, 'bairro', 2)
      texto(e, form, 'descricao', 20)
      return e
    },
    paraForm: (item) => paraForm(camposNegocio, item),
    deForm: (form) => aparar(form, camposNegocio.map((c) => c.name)),
    card: (item, td) => ({
      icon: Store,
      badge: td(item.categoria),
      title: td(item.nome),
      meta: item.bairro,
      metaIcon: MapPin,
      description: td(item.descricao),
    }),
  },
}

export const ORDEM_ENTIDADES = ['jobs', 'courses', 'businesses']
