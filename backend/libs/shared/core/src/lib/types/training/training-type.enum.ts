export enum TrainingType {
  Yoga = 'yoga',
  Running = 'running',
  Boxing = 'boxing',
  Stretching = 'stretching',
  Crossfit = 'crossfit',
  Aerobics = 'aerobics',
  Pilates = 'pilates'
};

export const TrainingTypeLabel: Record<TrainingType, string> = {
  [TrainingType.Yoga]: 'йога',
  [TrainingType.Running]: 'бег',
  [TrainingType.Boxing]: 'бокс',
  [TrainingType.Stretching]: 'стрейчинг',
  [TrainingType.Crossfit]: 'кроссфит',
  [TrainingType.Aerobics]: 'аэробика',
  [TrainingType.Pilates]: 'пилатес',
};