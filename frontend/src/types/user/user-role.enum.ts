export enum UserRole {
  Coach = 'coach',
  Sportsman = 'sportsman',
}

export const UserRoleSortLabel: Record<UserRole, string> = {
  [UserRole.Coach]: 'Тренеры',
  [UserRole.Sportsman]: 'Пользователи',
};
