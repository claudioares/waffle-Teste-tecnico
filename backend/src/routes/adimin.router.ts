import { FastifyInstance } from 'fastify'
import { calculateStreak } from '../utils/calculateStreak'
import { and, eq, gte, lte, notExists, exists, sql } from 'drizzle-orm'
import { db } from '../DB/db.connection'
import { openings, users } from '../drizzle/schema'
import { IGetInfoAdmin } from '../interfaces/interfaces'

export async function adminRoutes(fastify: FastifyInstance) {
  fastify.get('/admin/dashboard', async (request, reply) => {
    try {
      // Buscar todos os usuários e seus streaks diretamente
      const userList = await db
        .select({
          id: users.id,
          email: users.email,
          streak: users.streak,  // Pega o streak diretamente do banco de dados
        })
        .from(users);

      if (!userList.length) {
        return reply.status(404).send({ error: 'No users found' });
      }

      // Gerar ranking por streak
      const ranking = userList.sort((a, b) => b.streak - a.streak);

      reply.send({
        totalUsers: userList.length,
        ranking,
        userStats: userList,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      reply.status(500).send({ error: 'Internal server error' });
    }
  });
}

