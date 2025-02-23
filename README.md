# waffle-Teste-tecnico

# Relatório do Projeto

## 1. Stacks

### Quais as tecnologias usadas?

O projeto foi desenvolvido com as seguintes tecnologias:

**Backend:**
- **Linguagem:** TypeScript
- **Framework:** Fastify
- **ORM:** Drizzle ORM
- **Banco de dados:** PostgreSQL (hospedado no Neon)
- **Gerenciamento de ambiente:** Dotenv
- **Outras bibliotecas:** Zod (validação de dados), Axios (requisições HTTP)

**Frontend:**
- **Framework:** React com Vite
- **Estilização:** Tailwind CSS
- **Componentes:** shadcn/ui
- **Gerenciamento de rotas:** react-router-dom
- **Requisições:** Axios

### Quais problemas você enfrentou ao desenvolver?

- No início, tive dificuldades para entender completamente as diretrizes do projeto e a documentação no Notion, o que me fez perder algum tempo no começo da implementação.
- Para desenvolver o backend, precisei aprender tecnologias novas, como Neon e Drizzle ORM, o que exigiu um tempo extra de estudo e testes.
- No frontend, garantir que a autenticação funcionasse corretamente e impedisse acessos indevidos também foi um desafio.
- Não houve tempo suficiente para a implementação de testes automatizados com Jest ou Cypress.

### Qual a organização que escolheu e por quê?

- No backend, foi adotado o **padrão SOLID** e **orientação a objetos** para manter um código modular e fácil de manter.
- O frontend foi organizado seguindo a divisão de **componentes reutilizáveis** e a separação das responsabilidades entre **rotas** e **serviços de API**.

---

## 2. Dados

### Qual a estrutura do seu SQL?

- O banco de dados **PostgreSQL** foi modelado para armazenar informações sobre **usuários, streaks (sequência de leituras diárias), histórico de aberturas e badges conquistados**.
- As tabelas foram criadas e gerenciadas com **Drizzle ORM**.

### Como você lida com as inserções e consultas dos leitores?

- As inserções e consultas foram otimizadas utilizando **Drizzle ORM**, garantindo que as operações fossem eficientes e seguras.
- Foi criado um **script de seed** para popular automaticamente o banco com dados iniciais usando `npm run seed`.

### Ele é escalável? Explique.

Sim, a arquitetura permite escalabilidade devido a:

1. **Banco no Neon**: PostgreSQL gerenciado, permitindo aumento de carga sem preocupações com infraestrutura.
2. **Fastify**: Framework altamente performático, preparado para lidar com alto volume de requisições.
3. **Organização modular**: Facilita a adição de novas funcionalidades sem grandes mudanças na estrutura existente.

---

## 3. Testes

### Quais testes você realizou?

- Foram realizados **testes manuais e funcionais** para verificar a autenticação, acesso às rotas protegidas e exibição correta dos dados no frontend.
- Não houve tempo para testes automatizados com **Jest** ou **Cypress**.

### Quanto tempo levou o desenvolvimento e testes?

- O desenvolvimento exigiu todo o tempo oferecido por conta de ter sacrificado alguma tempo aprendendo algumas tecnologias.
- Os testes funcionais foram realizados no final, verificando a integridade do sistema antes da entrega.

# 📌 Documentação do Projeto Waffle

## 📢 Visão Geral
O projeto Waffle consiste em um backend e um frontend interligados, desenvolvidos para gerenciar usuários, streaks e badges conquistados.

## 🌐 **Links de Acesso**
- **API Backend**: [https://waffle-teste-tecnico.onrender.com](https://waffle-teste-tecnico.onrender.com)
- **Frontend**: [https://plataforma-waffle-tecnico.netlify.app/login](https://plataforma-waffle-tecnico.netlify.app/)

## 🏗️ **Tecnologias Utilizadas**

### Backend
- **Linguagem**: TypeScript
- **Framework**: Fastify
- **ORM**: Drizzle ORM
- **Banco de Dados**: PostgreSQL (Neon)
- **Bibliotecas Adicionais**:
  - @fastify/cors
  - @neondatabase/serverless
  - Axios
  - Dotenv
  - Zod
- **Execução**: Node.js

### Frontend
- **Framework**: React (Vite)
- **Estilização**: Tailwind CSS
- **Componentes**: shadcn/ui
- **Gerenciamento de Rotas**: react-router-dom
- **Requisições HTTP**: Axios

## 🚀 **Como Rodar o Projeto**

### 🔧 Backend
1. Clone o repositório do backend.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` na raiz do projeto com o seguinte formato:
   ```env
   PORT=3333
   DATABASE_URL=<SUA_CHAVE_DO_BANCO_NEON>
   ```
4. Execute o projeto:
   ```bash
   npm run dev
   ```
5. Para popular o banco de dados, execute:
   ```bash
   npm run seed
   ```

### 🎨 Frontend
1. Clone o repositório do frontend.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o projeto:
   ```bash
   npm run dev
   ```
4. Acesse a aplicação pelo navegador no endereço fornecido no terminal.

## 🔗 **Endpoints Disponíveis**

### 📍 **Endpoints do Backend**

| Método | Endpoint            | Descrição                |
|---------|----------------------|----------------------------|
| GET     | `/`                  | Webhook principal         |
| GET     | `/admin/dashboard`   | Dashboard do admin        |
| GET     | `/user`              | Dados do usuário         |

## 🔑 **Autenticação no Frontend**

- A autenticação é baseada no `localStorage`.
- Se um e-mail estiver salvo no `localStorage`, o usuário pode acessar as rotas protegidas.
- Se um usuário estiver logado, não pode acessar a página de login novamente.

### ✨ **Usuário de Teste**
- **E-mail**: Carter44@yahoo.com
- **Acesse a aplicação**: [https://plataforma-waffle-tecnico.netlify.app/login](https://plataforma-waffle-tecnico.netlify.app/)

## 📊 **Estrutura do Banco de Dados**
- Utiliza PostgreSQL hospedado no Neon.
- As tabelas foram criadas e gerenciadas pelo Drizzle ORM.
- O seed é responsável por popular automaticamente o banco de dados.

## 🛠 **Testes**
- Foram realizados **testes funcionais e manuais**.
- Não houve tempo hábil para implementar testes automatizados com Jest ou Cypress.

## 📅 **Tempo de Desenvolvimento**
- O backend e frontend foram desenvolvido aproveitando todo o tempo fornecido pelo projeto.
- Os testes funcionais foram realizados manualmente antes da entrega.

---

### 📢 **Considerações Finais**
O projeto foi desenvolvido com foco na escalabilidade e segurança, utilizando boas práticas como SOLID no backend e componentes reutilizáveis no frontend. Apesar da falta de testes automatizados, foram feitas diversas validações manuais para garantir a funcionalidade do sistema.

Se precisar de mais informações ou ajustes, estou à disposição! 🚀

