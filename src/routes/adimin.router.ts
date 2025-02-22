import { FastifyInstance } from 'fastify'
import { calculateStreak } from '../utils/calculateStreak'
import { and, eq, gte, lte, notExists, exists, sql } from 'drizzle-orm'
import { db } from '../DB/db.connection'
import { openings, users } from '../drizzle/schema'
import { IGetInfoAdmin } from '../interfaces/interfaces'

export async function adminRoutes(fastify: FastifyInstance) {
  fastify.get('/admin/dashboard', async (request, reply) => {
    try {
      // Parâmetros de query para filtros
      const { startDate, endDate, streakStatus, postId } = request.query as IGetInfoAdmin;

      // Preparar os filtros
      let whereClause = sql`TRUE` // Inicializa com um valor sempre verdadeiro

      if (startDate && endDate) {
        whereClause = and(
          whereClause,
          exists(
            db
              .select()
              .from(openings)
              .where(
                and(
                  eq(openings.userId, users.id),
                  gte(openings.date, new Date(startDate)),
                  lte(openings.date, new Date(endDate))
                )
              )
          )
        )
      }

      if (streakStatus === 'active') {
        whereClause = and(
          whereClause,
          exists(
            db
              .select()
              .from(openings)
              .where(
                and(
                  eq(openings.userId, users.id),
                  gte(openings.date, sql`CURRENT_DATE - INTERVAL '1 day'`)
                )
              )
          )
        )
      } else if (streakStatus === 'inactive') {
        whereClause = and(
          whereClause,
          notExists(
            db
              .select()
              .from(openings)
              .where(
                and(
                  eq(openings.userId, users.id),
                  gte(openings.date, sql`CURRENT_DATE - INTERVAL '1 day'`)
                )
              )
          )
        )
      }

      if (postId) {
        whereClause = and(
          whereClause,
          exists(
            db
              .select()
              .from(openings)
              .where(and(eq(openings.userId, users.id), eq(openings.postId, postId)))
          )
        )
      }

      // Buscar usuários com base nos filtros
      const userList = await db
        .select({
          id: users.id,
          email: users.email,
          streak: users.streak,
        })
        .from(users)
        .where(whereClause)

      if (!userList.length) {
        return reply.status(404).send({ error: 'No users found' })
      }

      // Buscar aberturas de todos os usuários filtrados
      const userOpenings = await db
        .select({
          userId: openings.userId,
          date: openings.date,
          postId: openings.postId,
          utmSource: openings.utmSource,
          utmMedium: openings.utmMedium,
          utmCampaign: openings.utmCampaign,
          utmChannel: openings.utmChannel,
        })
        .from(openings)
        .where(
          and(
            exists(
              db
                .select()
                .from(users)
                .where(eq(users.id, openings.userId))
            )
          )
        )

      // Criar um mapa de aberturas por usuário
      const openingsByUser: Record<number, typeof userOpenings> = {}
      userOpenings.forEach((opening) => {
        if (!openingsByUser[opening.userId]) {
          openingsByUser[opening.userId] = []
        }
        openingsByUser[opening.userId].push(opening)
      })

      // Calcular streak e gerar o ranking
      const userStats = userList.map((user) => {
        const userOpeningData = openingsByUser[user.id] || []
        return {
          email: user.email,
          streak: calculateStreak(userOpeningData),
          totalOpenings: userOpeningData.length,
        }
      })

      // Gerar ranking por streak
      const ranking = userStats.sort((a, b) => b.streak - a.streak)

      reply.send({
        totalUsers: userList.length,
        ranking,
        userStats,
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      reply.status(500).send({ error: 'Internal server error' })
    }
  })
}
