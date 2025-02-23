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
