export enum TrainingType {
  Yoga = 'yoga',
  Running = 'running',
  Boxing = 'boxing',
  Stretching = 'stretching',
  Crossfit = 'crossfit',
  Aerobics = 'aerobics',
  Pilates = 'pilates'
}

export const TrainingTypeLabel: Record<TrainingType, string> = {
  [TrainingType.Yoga]: 'Йога',
  [TrainingType.Running]: 'Бег',
  [TrainingType.Boxing]: 'Бокс',
  [TrainingType.Stretching]: 'Стрейчинг',
  [TrainingType.Crossfit]: 'Кроссфит',
  [TrainingType.Aerobics]: 'Аэробика',
  [TrainingType.Pilates]: 'Пилатес',
};
