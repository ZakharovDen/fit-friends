import { Sex, TrainingDuration, TrainingLevel, TrainingType, UserLocation, UserRole } from "@backend/core";

const users = [
  {
    id: '658170cbb954e9f5b905ccf4',
    email: 'user@local.local',
    name: 'Валерия',
    avatar: '/default/user-photo-1.png',
    password: '123456',
    sex: Sex.Female,
    dateOfBirth: new Date('01.01.1990'),
    description: 'Привет! Меня зовут Иванова Валерия, мне 34 года. Я профессиональный тренер по боксу. Не боюсь пробовать новое, также увлекаюсь кроссфитом, йогой и силовыми тренировками.',
    location: UserLocation.Petrogradskaya,
    backgroundImage: 'backend\\uploads\\2025\\03\\11aa6d8d-3ebd-4dda-82ca-6012a5709db7.png',
    role: UserRole.Sportsman,
    questionnaire: {
      level: TrainingLevel.Professional,
      types: [
        TrainingType.Crossfit,
        TrainingType.Yoga,
        TrainingType.Boxing
      ],
      duration: TrainingDuration["80-100"],
      caloriesTotal: 5000,
      caloriesByDay: 5000,
      isReady: true
    }
  },
  {
    id: '6581762309c030b503e30512',
    email: 'user2@local.local',
    name: 'Катерина',
    avatar: '/default/user-photo-2.png',
    password: '123456',
    sex: Sex.Female,
    dateOfBirth: new Date('01.01.2001'),
    description: 'Привет! Я Катерина и мне 27 лет. Обожаю спорт и все, что с ним связанно. Регулярно хожу на тренировки по кроссфиту, также занимаюсь йогой, рястяжкой и пилатесом.',
    location: UserLocation.Pionerskaya,
    backgroundImage: 'backend\\uploads\\2025\\03\\11aa6d8d-3ebd-4dda-82ca-6012a5709db7.png',
    role: UserRole.Sportsman,
    questionnaire: {
      level: TrainingLevel.Amateur,
      types: [
        TrainingType.Pilates,
        TrainingType.Yoga,
        TrainingType.Stretching
      ],
      duration: TrainingDuration["30-50"],
      caloriesTotal: 5000,
      caloriesByDay: 1000,
      isReady: false
    }
  },
];

export function getUsers() {
  return users;
}