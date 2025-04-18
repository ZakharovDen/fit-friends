import { UserRole } from "../../types/user/user-role.enum";

export const UserRoleLabel: Record<UserRole, string> = {
  [UserRole.Coach]: 'Я хочу тренировать',
  [UserRole.Sportsman]: 'Я хочу тренироваться',
}

export const UserRoleIcon: Record<UserRole, string> = {
  [UserRole.Coach]: '#icon-cup',
  [UserRole.Sportsman]: '#icon-weight',
}