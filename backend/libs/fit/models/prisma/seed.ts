import { PrismaClient } from '@prisma/client';

const FIRST_TRAINING_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_TRAINING_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';

const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';

function getTrainings() {
  return [
    {
      id: FIRST_TRAINING_UUID,
      userId: FIRST_USER_ID,
      title: 'Тренировка на все тело',
      image: 'image url',
      level: 'beginner',
      type: 'yoga',
      duration: '10-30',
      price: 1000,
      calories: 2000,
      description: 'Описание тренировки по йоге',
      sex: 'male',
      video: 'video url',
      specialOffer: true
    },
    {
      id: SECOND_TRAINING_UUID,
      userId: SECOND_USER_ID,
      title: 'Силовая тренировка',
      image: 'image url',
      level: 'professional',
      type: 'crossfit',
      duration: '80-100',
      price: 100500,
      calories: 5000,
      description: 'Описание силовой тренировки для всех',
      sex: 'any',
      video: 'video url',
      specialOffer: false
    },
  ]
}

async function seedDb(prismaClient: PrismaClient) {
  const mockTrainings = getTrainings();
  for (const training of mockTrainings) {
    await prismaClient.training.upsert({
      where: { id: training.id },
      update: {},
      create: training
    })
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