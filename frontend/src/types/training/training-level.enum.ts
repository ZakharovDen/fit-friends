export enum TrainingLevel {
  Beginner = 'beginner',
  Amateur = 'amateur',
  Professional = 'professional',
};

export const TrainingLevelLabel: Record<TrainingLevel, string> = {
  [TrainingLevel.Beginner]: 'Новичок',
  [TrainingLevel.Amateur]: 'Любитель',
  [TrainingLevel.Professional]: 'Профессионал',
};