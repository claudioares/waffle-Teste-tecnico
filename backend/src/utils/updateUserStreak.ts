import { InferSelectModel, eq } from "drizzle-orm";
import { db } from "../DB/db.connection";
import { users } from "../drizzle/schema";

type User = InferSelectModel<typeof users>;

export async function updateUserStreak(user: User) {
    const today = new Date();
    const lastOpenedAt = user.lastOpenedAt ? new Date(user.lastOpenedAt) : null;

    let streak = 1;

    if (lastOpenedAt) {
        // Calcular a diferença em dias entre hoje e o último acesso
        const diffDays = Math.floor((today.getTime() - lastOpenedAt.getTime()) / (1000 * 3600 * 24));

        // Se o último acesso foi ontem (diferença de 1 dia), soma 1 ao streak
        if (diffDays === 1) {
            streak = user.streak + 1;
        } else {
            // Caso contrário, reinicia o streak para 1
            streak = 1;
        }
    }

    // Atualiza o usuário com o novo streak e a data atual de acesso
    const updatedUser = {
        streak,
        lastOpenedAt: today,
    };

    // Atualiza a tabela de usuários no banco
    await db.update(users)
        .set(updatedUser as Partial<User>)
        .where(eq(users.id, user.id));

    return updatedUser;
}
