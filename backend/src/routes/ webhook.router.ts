import { FastifyInstance } from 'fastify';
import { MethodsUseCase } from '../usecases/methods.usecase';
import { IOpeningWebhook } from '../interfaces/interfaces';

export async function webhookRoutes(fastify: FastifyInstance) {
  fastify.get('/', async (request, reply) => {
    const data: IOpeningWebhook = request.query as IOpeningWebhook

    try {
      const useCase = new MethodsUseCase();
      const resultUseCase = await useCase.create(data);

      reply.status(200).send(resultUseCase);
      return;
    } catch (error) {
      console.error('Webhook processing error:', error);
      reply.status(500).send({ error: 'Internal server error' });
      return;
    }
  });
}
