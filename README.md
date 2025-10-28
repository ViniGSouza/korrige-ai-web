# KorrigeAI Web

Plataforma web de correção automática de redações do ENEM usando Inteligência Artificial.

## Tecnologias

- **React 19** + **TypeScript**
- **Vite** - Build tool
- **TailwindCSS v4** - Estilização
- **React Router v7** - Roteamento
- **TanStack Query** - Gerenciamento de estado assíncrono
- **Zustand** - Gerenciamento de estado global
- **React Hook Form + Zod** - Formulários e validação
- **Axios** - Cliente HTTP
- **Vitest + Testing Library** - Testes

## Pré-requisitos

- Node.js 18+
- npm ou yarn

## Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
```

## Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

## Testes

```bash
# Executar testes
npm test

# Testes com interface
npm run test:ui

# Coverage
npm run test:coverage
```

## Estrutura do Projeto

```
src/
├── domain/          # Módulos de domínio (auth, essays, dashboard)
├── layouts/         # Layouts da aplicação
├── pages/           # Páginas públicas
├── providers/       # Providers globais (Query, Theme)
├── routes/          # Configuração de rotas
├── shared/          # Componentes e utilitários compartilhados
└── styles/          # Estilos globais e animações
```

## Features

- Autenticação com AWS Cognito
- Upload de redações (texto, imagem, PDF, DOCX)
- Correção automática com IA
- Dashboard com estatísticas
- Tema claro/escuro
- Design responsivo

## Licença

Proprietary
