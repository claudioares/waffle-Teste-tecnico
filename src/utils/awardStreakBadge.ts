import { db } from "../DB/db.connection";
import { badges } from "../drizzle/schema";
import { eq, and } from "drizzle-orm";


export async function awardStreakBadge(userId: number, streak: number) {
    if (streak === 3) {
        const existingBadge = await db
            .select()
            .from(badges)
            .where(
                and(
                    eq(badges.userId, userId),
                    eq(badges.name, "3 Dias Seguidos")
                )
            )
            .then((res) => res[0]);

        // Evitar inserir o mesmo badge mais de uma vez
        if (!existingBadge) {
            await db.insert(badges).values({
                name: "3 Dias Seguidos",
                description: "Você abriu a newsletter por 3 dias consecutivos!",
                userId: userId,
            });
        }
    }
}
