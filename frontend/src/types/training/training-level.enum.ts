export enum TrainingLevel {
  Beginner = 'beginner',
  Amateur = 'amateur',
  Professional = 'professional',
};

export const TrainingLevelLabel: Record<TrainingLevel, string> = {
  [TrainingLevel.Beginner]: 'новичок',
  [TrainingLevel.Amateur]: 'любитель',
  [TrainingLevel.Professional]: 'профессионал',
};