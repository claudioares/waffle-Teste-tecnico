import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql', // Usando PostgreSQL com Neon
  schema: './src/drizzle/schema.ts', // Caminho para o seu arquivo de esquema
  out: './src/drizzle/migrations', // Pasta onde as migrações serão armazenadas
  dbCredentials: {
    url: process.env.DATABASE_URL ?? '', // URL de conexão com o Neon
    // ou usando variáveis de ambiente:
    // url: process.env.DATABASE_URL,
  },
  migrations: {
    table: '__drizzle_migrations', // Tabela de log das migrações (padrão)
    schema: 'public', // Esquema no banco
  },
});
