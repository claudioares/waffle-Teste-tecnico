import { db } from "./src/DB/db.connection"; // Importa a conexão com o banco
import { users, openings, badges } from "./src/drizzle/schema"; // Importa as tabelas do Drizzle
import { faker } from "@faker-js/faker";

const NUM_USERS = 50;
const OPENINGS_PER_USER = 5;
const BADGES_PER_USER = 2;

async function seed() {
  console.log("🛠️ Iniciando seed...");

  try {
    // Limpando as tabelas antes de popular
    await db.delete(openings);
    await db.delete(badges);
    await db.delete(users);
    console.log("✅ Tabelas limpas.");

    // Criando usuários
    const usersData = Array.from({ length: NUM_USERS }).map(() => ({
      email: faker.internet.email(),
      streak: faker.number.int({ min: 0, max: 10 }), // Verifique se existe no schema
      lastOpenedAt: new Date(faker.date.recent({ days: 10 }).toISOString()), // Verifique se existe no schema
    }));

    const insertedUsers = await db.insert(users).values(usersData).returning({ id: users.id });
    console.log(`✅ ${NUM_USERS} usuários criados.`);

    // Criando aberturas
    const openingsData = insertedUsers.flatMap(user =>
      Array.from({ length: OPENINGS_PER_USER }).map(() => ({
        date: new Date(faker.date.recent({ days: 30 }).toISOString()),
        userId: user.id,
        postId: faker.datatype.boolean() ? faker.string.uuid() : null,
        utmSource: faker.datatype.boolean() ? faker.internet.domainName() : null,
        utmMedium: faker.datatype.boolean() ? faker.lorem.word() : null,
        utmCampaign: faker.datatype.boolean() ? faker.lorem.slug() : null,
        utmChannel: faker.datatype.boolean() ? faker.lorem.word() : null,
      }))
    );

    await db.insert(openings).values(openingsData);
    console.log(`✅ ${NUM_USERS * OPENINGS_PER_USER} aberturas criadas.`);

    // Criando badges
    const badgesData = insertedUsers.flatMap(user =>
      Array.from({ length: BADGES_PER_USER }).map(() => ({
        name: faker.lorem.word(),
        description: faker.lorem.sentence(),
        userId: user.id,
        dateEarned: new Date(faker.date.past().toISOString()), // Verifique se existe no schema
      }))
    );

    await db.insert(badges).values(badgesData);
    console.log(`✅ ${NUM_USERS * BADGES_PER_USER} badges criadas.`);

    console.log("🎉 Seed finalizado!");
  } catch (error) {
    console.error("❌ Erro ao executar seed:", error);
  }
}

seed();
