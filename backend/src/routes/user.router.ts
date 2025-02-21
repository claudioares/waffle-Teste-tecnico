import { FastifyInstance } from 'fastify';
import { users } from '../drizzle/schema';
import { InferSelectModel, eq, desc } from 'drizzle-orm';
import { MethodsUseCase } from '../usecases/methods.usecase';

type User = InferSelectModel<typeof users>;

export async function userRoutes(fastify: FastifyInstance) {
  // Rota para consultar os dados do usuário
  fastify.post('/user', async (request, reply) => {
    const { email } = request.body as { email: string };

    try {
      const usecase = new MethodsUseCase();
      const resultUseCase = await usecase.login({email});

      reply.status(200).send(resultUseCase);
      return;
    } catch (error) {
      console.error('Error fetching user stats:', error);
      reply.status(500).send({ error: 'Internal server error' });
    }
  });
}
