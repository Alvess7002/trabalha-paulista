# Trabalha Paulista

Deploy: https://trabalha-paulista-main.vercel.app

Plataforma de empregabilidade, capacitação profissional e empreendedorismo local em Paulista–PE.

> Projeto acadêmico desenvolvido de forma progressiva. Esta é a primeira versão, com dados fictícios e sem backend.

## Problema identificado

- Dificuldade de encontrar oportunidades de emprego.
- Dificuldade de localizar cursos de capacitação.
- Pequenos empreendedores têm dificuldade para divulgar seus negócios.
- Informações importantes estão dispersas em diferentes plataformas.

## Objetivo geral

Reunir, em uma única plataforma, oportunidades de emprego, cursos de capacitação e divulgação de pequenos negócios de Paulista–PE.

## Objetivos específicos

- Apresentar vagas de emprego de forma organizada.
- Facilitar a descoberta de cursos de capacitação.
- Dar visibilidade a pequenos empreendedores locais.
- Oferecer uma interface simples, responsiva e acessível.
- Preparar a base do código para evoluções futuras.

## Público-alvo

- Pessoas em busca de emprego ou recolocação.
- Pessoas interessadas em qualificação profissional.
- Pequenos empreendedores de Paulista–PE.

## Funcionalidades implementadas

- [x] Página inicial com navegação principal e seções de oportunidades, capacitação e empreendedorismo
- [x] Páginas de vagas, capacitação, empreendedorismo e sobre (dados fictícios)
- [x] Login com validação, mostrar/ocultar senha e feedback de acesso
- [x] Cadastro com validação e confirmação de senha
- [x] Recuperação de senha (apenas demonstrativa)
- [x] Área restrita com logoff e bloqueio sem autenticação
- [x] Layout responsivo (desktop e celular)
- [x] Barra de Busca 
- [x] Tela de Contato
- [x] Painel de Acessibilidade
- [x] Tradução para Língua Inglesa
- [x] Pesquisa por Data 
- [x] Painel administrativo: cadastrar, editar e excluir vagas, cursos e negócios, com etapa de revisão (dados + pré-visualização) antes de publicar e opção de rascunho
- [x] Favoritos: salvar vagas e cursos (botão de coração), filtro "só favoritos" e seção "Meus favoritos" na área restrita
- [x] Candidatura às vagas: botão de candidatar-se, vínculo com o usuário logado, data registrada e acompanhamento do status (enviada, em análise ou encerrada) na área restrita


## Tecnologias

React, Vite, JavaScript, HTML5, CSS3, React Router DOM, Lucide React, ESLint (com regras de React Hooks), Git e GitHub.

## Integrantes

- Giovanni Alves Bezerra da Silva
- Heytor Nascimento de Santana
- Matheus Ribeiro Lima Alves
- Nicolas França Amaral Sampaio

## Como executar

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção
npm run lint     # análise estática
```
## Estrutura de pastas

```
src/
├── admin/        # Configuração dos tipos de conteúdo e gerenciador (lista → formulário → revisão)
├── components/   # Navbar, Footer, Layout, PageHero, InfoCard, FormField, ProtectedRoute, AdminRoute, AuthActions
├── context/      # AuthProvider (autenticação), CandidaturasProvider, FavoritosProvider e CatalogoProvider (vagas, cursos e negócios)
├── data/         # Dados de exemplo (vagas, cursos, negócios) e lista de e-mails administradores
├── hooks/        # useAuth, useCandidaturas, useCatalogo, useFavoritos
├── pages/        # Páginas da aplicação
└── utils/        # Validadores de formulário
```

## Painel administrativo

Acesse em `/admin` (também pelo botão "Abrir painel" na área restrita). Para ter acesso, **cadastre-se com o e-mail `admin@trabalhapaulista.com`** (lista em `src/data/admin.js`). Cada vaga, curso ou negócio passa por três etapas: formulário → revisão → publicar ou salvar como rascunho. Só itens **publicados** aparecem nas páginas públicas.

## Limitações da versão atual

- Sem backend nem banco de dados; todos os conteúdos são fictícios.
- A autenticação é **apenas demonstrativa**: usuários e sessão ficam no `localStorage`, com senha sem criptografia. Não oferece segurança real.
- A recuperação de senha não envia e-mails.
- O painel administrativo é **demonstrativo**: o acesso é decidido no navegador pelo e-mail, e o catálogo editado fica no `localStorage` (qualquer pessoa com acesso ao navegador poderia alterá-lo). Textos cadastrados no painel não têm tradução para o inglês.
- Os favoritos também ficam no `localStorage`, vinculados ao e-mail do usuário; é preciso estar logado para salvar.
- As candidaturas também ficam no `localStorage` (vinculadas ao e-mail do usuário). O andamento do status é **simulado** pelo botão "Simular andamento" na área restrita; sem backend, nenhuma empresa recebe a candidatura de fato.

## Melhorias planejadas (ainda não implementadas)

- Backend e banco de dados com autenticação real.
- Cadastro de vagas, cursos e negócios pelos próprios empregadores/empreendedores (hoje apenas pelo administrador) e papéis de acesso validados no servidor.
- Busca e filtros por categoria e bairro.
- Perfil de usuário e envio real das candidaturas às empresas, com atualização de status por elas.
- Testes automatizados.


<img width="1920" height="959" alt="image" src="https://github.com/user-attachments/assets/5dbc73c8-85c5-471a-a9ef-8b36e0251bc4" />
<img width="1920" height="959" alt="image" src="https://github.com/user-attachments/assets/2e93c562-fe64-438e-99e9-9d87c84aec67" />
<img width="1920" height="958" alt="image" src="https://github.com/user-attachments/assets/374d782b-37a7-4181-8a8e-522f25606680" />
<img width="1920" height="961" alt="image" src="https://github.com/user-attachments/assets/9ad88f38-e26e-4e41-8b47-97339ef3aa16" />
<img width="1920" height="959" alt="image" src="https://github.com/user-attachments/assets/3214e559-93bf-407a-92ec-3f1827257f52" />



