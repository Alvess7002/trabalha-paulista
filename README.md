# Trabalha Paulista

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
├── components/   # Navbar, Footer, Layout, PageHero, InfoCard, FormField, ProtectedRoute, AuthActions
├── context/      # AuthProvider e contexto de autenticação
├── data/         # Dados demonstrativos (vagas, cursos, negócios)
├── hooks/        # useAuth
├── pages/        # Páginas da aplicação
└── utils/        # Validadores de formulário
```

## Limitações da versão atual

- Sem backend nem banco de dados; todos os conteúdos são fictícios.
- A autenticação é **apenas demonstrativa**: usuários e sessão ficam no `localStorage`, com senha sem criptografia. Não oferece segurança real.
- A recuperação de senha não envia e-mails.
- Não há busca, filtros ou candidatura a vagas.

## Melhorias planejadas (ainda não implementadas)

- Backend e banco de dados com autenticação real.
- Cadastro de vagas, cursos e negócios por usuários.
- Busca e filtros por categoria e bairro.
- Candidatura a vagas e perfil de usuário.
- Testes automatizados.