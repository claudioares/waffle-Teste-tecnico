import { InferSelectModel, eq } from "drizzle-orm";
import { db } from "../DB/db.connection";
import { users } from "../drizzle/schema";

type User = InferSelectModel<typeof users>;

export async function updateUserStreak(user: User) {
    const today = new Date();
    const lastOpenedAt = user.lastOpenedAt ? new Date(user.lastOpenedAt) : null;

    let streak = 1;
    if (lastOpenedAt) {
        const diffDays = Math.floor((today.getTime() - lastOpenedAt.getTime()) / (1000 * 3600 * 24));
        streak = diffDays === 1 ? user.streak + 1 : 1;
    }

    const updatedUser = {
        streak,
        lastOpenedAt: today,
    };

    await db.update(users)
        .set(updatedUser as Partial<User>)
        .where(eq(users.id, user.id));

    return updatedUser;
}
