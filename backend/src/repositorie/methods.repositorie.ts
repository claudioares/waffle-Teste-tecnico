import { db } from "../DB/db.connection";
import { badges, openings, users } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { updateUserStreak } from "../utils/updateUserStreak";
import { awardStreakBadge } from "../utils/awardStreakBadge";
import { IOpeningWebhook, IResponseOpennewsletter, IUserLogin, UserResponse } from "../interfaces/interfaces";
import { IMethodsOpeningsValues } from "../interfaces/method.interface";


export class methodsRepositorie implements IMethodsOpeningsValues {
    async create(data: IOpeningWebhook): Promise<IResponseOpennewsletter> {
        let user = await db.select().from(users).where(eq(users.email, data.email)).limit(1).then(res => res[0]);
        const email = data.email;
        // Se o usuário não existir, insira um novo usuário
        if (!user) {
            user = await db.insert(users).values({ email }).returning().then(res => res[0]);
        }

        await db.insert(openings).values({
            userId: user.id,
            ...data
        });

        updateUserStreak(user);

        return { message: "Webhook processed successfully"};
    };

    async login({ email }: IUserLogin): Promise<UserResponse> {

        const user = await db.select().from(users).where(eq(users.email, email)).limit(1).then(res => res[0]);
        
        // Atualizar o streak
        const updatedUser = await updateUserStreak(user);

        // Verificar se o usuário alcançou 3 dias seguidos e conceder badge
        awardStreakBadge(user.id, updatedUser.streak);

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
                streak:  updatedUser?.streak || user.streak,
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
    };

    async verifyUser(email: string): Promise<boolean> {
        // Verificar se o usuário já existe no banco
        let user = await db.select().from(users).where(eq(users.email, email)).limit(1).then(res => res[0]);
        if (!user) {
            return false;
        }
        return true;
    };
}