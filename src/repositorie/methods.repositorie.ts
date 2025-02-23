import { db } from "../DB/db.connection";
import { badges, openings, users } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { updateUserStreak } from "../utils/updateUserStreak";
import { awardStreakBadge } from "../utils/awardStreakBadge";
import { IOpeningWebhook, IResponseOpennewsletter, IUserLogin, UserResponse } from "../interfaces/interfaces";
import { IMethodsOpeningsValues } from "../interfaces/method.interface";


export class methodsRepositorie implements IMethodsOpeningsValues {
    async create(data: IOpeningWebhook): Promise<IResponseOpennewsletter | { message: string }> {
        // Buscar o usuário existente
        let user = await db.select().from(users).where(eq(users.email, data.email)).limit(1).then(res => res[0]);
        const email = data.email;

        // Se o usuário não existir, insira um novo usuário
        if (!user) {
            user = await db.insert(users).values({ email }).returning().then(res => res[0]);
        }

        // Verificar a data de hoje e o último acesso
        const today = new Date();
        const lastOpenedAt = user.lastOpenedAt ? new Date(user.lastOpenedAt) : null;

        // Verificar se a abertura é no mesmo dia do último acesso
        if (lastOpenedAt && lastOpenedAt.toDateString() === today.toDateString()) {
            // Se for a mesma data, retorna mensagem de que já foi feito o streak
            return { message: "Streak já registrado para hoje." };
        }

        // Verifica se a última abertura foi no dia anterior
        let streak = 1; // Se for a primeira vez ou um intervalo maior que um dia
        if (lastOpenedAt) {
            const diffDays = Math.floor((today.getTime() - lastOpenedAt.getTime()) / (1000 * 3600 * 24));
            if (diffDays === 1) {
                streak = user.streak + 1; // Continua o streak
            }
        }

        // Inserir a nova abertura
        await db.insert(openings).values({
            userId: user.id,
            ...data,
        });

        // Atualizar o streak do usuário com o novo valor
        const updatedUser = await db.update(users)
            .set({
                streak, // Atualiza com o novo valor do streak
                lastOpenedAt: today, // Atualiza a data de abertura
            } as unknown as Partial<typeof users>)
            .where(eq(users.id, user.id))
            .returning()
            .then(res => res[0]);

        return { message: "Webhook processed successfully", user: updatedUser };
    }




    async login({ email }: IUserLogin): Promise<UserResponse> {

        const user = await db.select().from(users).where(eq(users.email, email)).limit(1).then(res => res[0]);
        
        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        // Buscar as aberturas 
        const openingsData = await db
            .select()
            .from(openings)
            .where(eq(openings.userId, user.id));

        // Buscar os badges 
        const userBadges = await db
            .select()
            .from(badges)
            .where(eq(badges.userId, user.id));

        // Organiza os dados
        const userResponse = {
            user: {
                id: user.id,
                email: user.email,
                streak: user.streak, // Aqui estamos apenas pegando o streak sem atualizar
                lastOpenedAt: user.lastOpenedAt ? user.lastOpenedAt.toISOString() : null,
                openings: openingsData.map(opening => ({
                    id: opening.id,
                    date: opening.date,
                    postId: opening.postId,
                    utmSource: opening.utmSource,
                    utmMedium: opening.utmMedium,
                    utmCampaign: opening.utmCampaign,
                    utmChannel: opening.utmChannel,
                })),
                badges: userBadges.map(badge => ({
                    id: badge.id,
                    name: badge.name,
                    description: badge.description,
                    dateEarned: badge.dateEarned ? badge.dateEarned.toISOString() : null,
                })),
            }
        };

        return userResponse;
    }

    async verifyUser(email: string): Promise<boolean> {
        // Verificar se o usuário já existe no banco
        let user = await db.select().from(users).where(eq(users.email, email)).limit(1).then(res => res[0]);
        if (!user) {
            return false;
        }
        return true;
    };
}