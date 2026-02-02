# RFin - Controle Financeiro Pessoal

Aplicação de controle financeiro pessoal desenvolvida com Next.js, Prisma e Clean Architecture.

## 🏗️ Arquitetura Backend

O backend segue os princípios **SOLID** e **Clean Architecture**, garantindo código desacoplado, testável e fácil de manter.

### 📁 Estrutura de Pastas

```
src/server/
├── domain/                    # 🎯 Regras de negócio (independente de tudo)
│   ├── entities/             # Entidades do domínio
│   │   ├── User.ts
│   │   ├── Transaction.ts
│   │   └── PaymentCard.ts
│   ├── repositories/         # INTERFACES dos repositórios
│   │   ├── IUserRepository.ts
│   │   ├── ITransactionRepository.ts
│   │   └── IPaymentCardRepository.ts
│   └── errors/               # Erros customizados
│       └── DomainErrors.ts
│
├── application/              # 🔄 Casos de uso (orquestra o domínio)
│   ├── use-cases/
│   │   ├── user/
│   │   │   ├── CreateUser.ts
│   │   │   ├── AuthenticateUser.ts
│   │   │   └── GetUserById.ts
│   │   ├── transaction/
│   │   │   ├── CreateTransaction.ts
│   │   │   └── ListTransactions.ts
│   └── dtos/                 # Data Transfer Objects
│       ├── UserDTO.ts
│       └── TransactionDTO.ts
│
├── infrastructure/           # 🔌 Implementações concretas
│   ├── database/
│   │   ├── prisma/          # Implementação Prisma
│   │   │   ├── repositories/
│   │   │   │   ├── PrismaUserRepository.ts
│   │   │   │   └── PrismaTransactionRepository.ts
│   │   │   └── client.ts
│   │   └── mongodb/         # Futuro: implementação MongoDB
│   │       └── repositories/
│   └── external/             # Serviços externos
│       ├── email/
│       └── storage/
│
└── presentation/             # 🌐 Camada de apresentação (API)
    ├── http/
    │   ├── controllers/
    │   │   ├── UserController.ts
    │   │   └── TransactionController.ts
    │   └── middlewares/
    └── factories/            # Dependency Injection
        └── makeCreateUserUseCase.ts
```

### 🎯 Camadas da Arquitetura

#### 1. **Domain (Domínio)**

- **Responsabilidade:** Regras de negócio puras
- **Dependências:** Nenhuma! Completamente isolada
- **Contém:**
  - `entities/` - Classes que representam conceitos do negócio
  - `repositories/` - Interfaces (contratos) dos repositórios
  - `errors/` - Erros de domínio customizados

#### 2. **Application (Aplicação)**

- **Responsabilidade:** Casos de uso e orquestração
- **Dependências:** Apenas do Domain
- **Contém:**
  - `use-cases/` - Regras de aplicação (criar usuário, autenticar, etc)
  - `dtos/` - Objetos para transferir dados entre camadas

#### 3. **Infrastructure (Infraestrutura)**

- **Responsabilidade:** Implementações concretas
- **Dependências:** Domain e Application
- **Contém:**
  - `database/prisma/` - Implementação com Prisma
  - `database/mongodb/` - (Futuro) Implementação com MongoDB
  - `external/` - Integrações externas (email, storage, etc)

#### 4. **Presentation (Apresentação)**

- **Responsabilidade:** Interface com o mundo externo (APIs)
- **Dependências:** Todas as camadas
- **Contém:**
  - `controllers/` - Controladores HTTP
  - `middlewares/` - Middlewares de autenticação, validação, etc
  - `factories/` - Injeção de dependências

### ✨ Benefícios

✅ **Fácil de Trocar Banco de Dados**

- Basta criar nova implementação em `infrastructure/database/`
- O domínio e casos de uso não mudam

✅ **Testável**

- Casos de uso testáveis sem banco de dados
- Mocks fáceis através das interfaces

✅ **Manutenível**

- Cada camada com responsabilidade clara
- Alterações isoladas

✅ **Desacoplado**

- Domínio não conhece Prisma, Next.js ou qualquer framework

### 🔄 Fluxo de Dados

```
API Route → Controller → Use Case → Repository Interface → Prisma Repository → Database
                            ↓
                          Entity
```

### 📝 Exemplo de Uso

```typescript
// 1. Factory cria o use case com dependências
export function makeCreateUserUseCase() {
  const userRepository = new PrismaUserRepository()
  return new CreateUserUseCase(userRepository)
}

// 2. Controller usa o use case
export async function POST(request: Request) {
  const createUser = makeCreateUserUseCase()
  const user = await createUser.execute(data)
  return Response.json(user)
}

// 3. Para trocar de banco: apenas muda a factory
export function makeCreateUserUseCase() {
  const userRepository = new MongoUserRepository() // ← Mudança aqui
  return new CreateUserUseCase(userRepository) // Use case inalterado!
}
```
