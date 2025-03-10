export const AuthorFieldDescription = {
  Id: { description: 'Уникальный идентификатор автора публикации', example: 'dd4319c5-5454-420c-8025-b4af417d7f47' },
  Name: { description: 'Имя автора публикации', example: 'Ivanov Ivan' },
  Email: { description: 'Электронная почта автора публикации', example: 'example@email.com' },
} as const;

export const AvatarParams = {
  MaxSize: 500000,
  FileType: /(jpg|jpeg|png)$/,
} as const;

export const PhotoParams = {
  MaxSize: 1000000,
  FileType: /(jpg|jpeg|png)$/,
} as const;