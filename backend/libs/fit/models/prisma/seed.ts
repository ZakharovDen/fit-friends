import { PrismaClient } from '@prisma/client';
import { DataGenerator } from '@backend/helpers';

const TRAININGS_COUNT = 20;

async function seedDb(prismaClient: PrismaClient) {
  const dataGenerator = new DataGenerator();
  await prismaClient.training.deleteMany();
  for (let i = 0; i < TRAININGS_COUNT; i++) {
    const training = dataGenerator.generateTraining();
    const feedbacks = dataGenerator.generateFeedbacks();
    await prismaClient.training.create({ data: {...training, feedbacks: {create: feedbacks}} });
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();