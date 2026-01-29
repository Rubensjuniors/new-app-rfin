# 🗂️ Guia de Organização - API Next.js

Estrutura de pastas para migração da API Fastify para Next.js App Router, mantendo a arquitetura limpa em camadas.

---

## 📂 Estrutura Completa

```
📂 src/
│
├── 📝 @types/                                    Tipos TypeScript customizados
│   └── next-auth.d.ts
│
├── 🏠 app/                                       Next.js App Router
│   │
│   ├── api/                                      🛣️ ROTAS DA API (Route Handlers)
│   │   ├── auth/
│   │   │   ├── login/route.ts                   POST /api/auth/login
│   │   │   ├── logout/route.ts                  POST /api/auth/logout
│   │   │   ├── refresh/route.ts                 POST /api/auth/refresh
│   │   │   └── verify/route.ts                  GET /api/auth/verify
│   │   │
│   │   ├── users/
│   │   │   ├── route.ts                         GET/POST /api/users
│   │   │   ├── profile/route.ts                 GET /api/users/profile
│   │   │   └── [id]/route.ts                    GET/PUT/DELETE /api/users/:id
│   │   │
│   │   ├── categories/
│   │   │   ├── route.ts                         GET/POST /api/categories
│   │   │   └── [id]/route.ts                    GET/PUT/DELETE /api/categories/:id
│   │   │
│   │   ├── payment-cards/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   │
│   │   └── transactions/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── 💼 services/                                  CAMADA DE NEGÓCIO (regras de negócio)
│   ├── auth/
│   │   ├── authenticate-service/
│   │   │   ├── index.ts
│   │   │   ├── types.ts
│   │   │   └── authenticate-service.spec.ts
│   │   ├── refresh-token-service/
│   │   └── verify-token-service/
│   │
│   ├── users/
│   │   ├── create-user-service/
│   │   ├── get-user-profile-service/
│   │   └── update-user-service/
│   │
│   ├── categories/
│   │   ├── create-category-service/
│   │   ├── list-categories-service/
│   │   └── delete-category-service/
│   │
│   ├── payment-cards/
│   │   ├── create-payment-card-service/
│   │   └── list-payment-cards-service/
│   │
│   └── transactions/
│       ├── create-transaction-service/
│       └── list-transactions-service/
│
├── 💾 repositories/                              CAMADA DE DADOS (comunicação com DB)
│   ├── prisma-users-repository/
│   │   ├── index.ts
│   │   └── types.ts
│   ├── prisma-categories-repository/
│   │   ├── index.ts
│   │   └── types.ts
│   ├── prisma-payment-cards-repository/
│   │   ├── index.ts
│   │   └── types.ts
│   └── prisma-transactions-repository/
│       ├── index.ts
│       └── types.ts
│
├── 🏭 factories/                                 INJEÇÃO DE DEPENDÊNCIAS
│   ├── auth/
│   │   ├── make-authenticate-service.ts
│   │   ├── make-refresh-token-service.ts
│   │   └── make-verify-token-service.ts
│   ├── users/
│   │   ├── make-create-user-service.ts
│   │   ├── make-get-user-profile-service.ts
│   │   └── make-update-user-service.ts
│   ├── categories/
│   │   └── make-create-category-service.ts
│   ├── payment-cards/
│   │   └── make-create-payment-card-service.ts
│   └── transactions/
│       └── make-create-transaction-service.ts
│
├── 🔧 shared/                                    CÓDIGO COMPARTILHADO
│   ├── schemas/                                  Validação de dados (Zod)
│   │   ├── user-schema/
│   │   │   └── index.ts
│   │   ├── category-schema/
│   │   │   └── index.ts
│   │   ├── payment-card-schema/
│   │   │   └── index.ts
│   │   └── transaction-schema/
│   │       └── index.ts
│   │
│   ├── errors/                                   Tratamento de erros
│   │   ├── app-error.ts
│   │   ├── error-handler.ts
│   │   └── error-messages.ts
│   │
│   ├── middleware/                               Middlewares reutilizáveis
│   │   ├── with-auth.ts
│   │   ├── with-error-handler.ts
│   │   └── with-validation.ts
│   │
│   ├── utils/                                    Utilitários
│   │   ├── http-response.ts
│   │   ├── jwt.ts
│   │   └── cookies.ts
│   │
│   ├── assets/
│   │   └── styles/
│   │       └── globals.css
│   │
│   └── components/
│       └── ui/
│           └── button.tsx
│
├── 🌍 config/                                    CONFIGURAÇÕES
│   └── env.ts                                   Validação de variáveis de ambiente
│
├── 📚 lib/                                       BIBLIOTECAS EXTERNAS
│   ├── prisma.ts
│   └── utils.ts
│
└── 🎭 __mocks__/                                 MOCKS PARA TESTES
    └── in-memory/
        ├── in-memory-users-repository.ts
        └── in-memory-categories-repository.ts
```

---

## 🔄 Fluxo de Dados (Camadas)

```
┌─────────────────────────────────────────────────────────────┐
│                     Route Handler                            │
│              (src/app/api/*/route.ts)                        │
│         Recebe HTTP → Valida → Delega → Responde            │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                       Factory                                │
│              (src/factories/*/*.ts)                          │
│              Cria instâncias com DI                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                       Service                                │
│              (src/services/*/*.ts)                           │
│              Regras de negócio da aplicação                  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                     Repository                               │
│              (src/repositories/*/*.ts)                       │
│              Acesso ao banco de dados (Prisma)               │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      Database                                │
│                    PostgreSQL                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Mapeamento Fastify → Next.js

| **Fastify**                  | **Next.js**                          |
| ---------------------------- | ------------------------------------ |
| `src/app/controllers/`       | `src/app/api/*/route.ts`             |
| `src/app/services/`          | `src/services/`                      |
| `src/app/repositories/`      | `src/repositories/`                  |
| `src/app/factories/`         | `src/factories/`                     |
| `src/app/routes/`            | `src/app/api/` (estrutura de pastas) |
| `src/app/shared/dtos/`       | `src/shared/schemas/`                |
| `src/app/shared/errors/`     | `src/shared/errors/`                 |
| `src/app/shared/middleware/` | `src/shared/middleware/`             |
| `src/app/shared/utils/`      | `src/shared/utils/`                  |
| `src/env/`                   | `src/config/env.ts`                  |
| `src/libs/`                  | `src/lib/`                           |

---

## ✅ Convenções de Nomenclatura

- **Pastas:** `kebab-case` → `create-user-service/`
- **Route Handlers:** `route.ts` (obrigatório no Next.js)
- **Parâmetros dinâmicos:** `[id]/route.ts` → `/api/users/:id`
- **Classes:** `PascalCase` → `CreateUserService`
- **Funções:** `camelCase` → `makeCreateUserService()`

---

## 🎯 Responsabilidade de Cada Camada

### `src/app/api/` - Route Handlers

- Receber requisições HTTP
- Validar entrada (schemas)
- Chamar factories/services
- Retornar respostas HTTP
- **NÃO contém regras de negócio**

### `src/services/` - Lógica de Negócio

- Regras de negócio da aplicação
- Validações de domínio
- Orquestração entre repositories
- **Independente de framework**

### `src/repositories/` - Acesso a Dados

- CRUD com Prisma
- Queries específicas
- **Única camada que conhece o Prisma**

### `src/factories/` - Injeção de Dependências

- Instanciar repositories
- Instanciar services
- Configurar dependências

### `src/shared/schemas/` - Validação

- Schemas Zod
- Validação de entrada/saída

### `src/shared/middleware/` - Middlewares

- Autenticação (`withAuth`)
- Tratamento de erros (`withErrorHandler`)
- Validação genérica

---

**Mantenha a separação de responsabilidades e a aplicação ficará escalável e testável!** 🚀
