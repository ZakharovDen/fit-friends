## Учебный проект «FitFriends»

* Студент: [Денис Захаров](https://htmlacademy.ru//profile/id2486641).

## Установка проекта
### Frontend
#### Установка пакетов
```bash
cd .\frontend\
npm install
```
### Backend
#### Установка пакетов
```bash
cd .\backend\
npm install
```
#### Установка переменных окружения
##### \apps\account\account.env
```
PORT=3333                               # Порт на котором будет запущен сервис Account

MONGO_DB=users                          # Название БД в MongoDB для хранения пользователей
MONGO_HOST=localhost                    # Хост MongoDB
MONGO_PORT=27017                        # Порт MongoDB
MONGO_USER=admin                        # Имя для пользователя MongoDB
MONGO_PASSWORD=123456                   # Пароль для пользователя MongoDB
MONGO_AUTH_BASE=admin

JWT_ACCESS_TOKEN_SECRET=jH3fdwefjoI24   # Секрет для JWT Access
JWT_ACCESS_TOKEN_EXPIRES_IN=15m         # Время жизни JWT Access токена
JWT_REFRESH_TOKEN_SECRET=secret         # Секрет для JWT Refresh
JWT_REFRESH_TOKEN_EXPIRES_IN=7d         # Время жизни JWT Refresh токена
```
##### \apps\api\ .env
```
PORT=3000                               # Порт на котором будет запущен сервис ApiGateway
```
##### \apps\file-vault\file-vault.env
```
PORT=3337                               # Порт на котором будет запущен сервис FileVault
UPLOAD_DIRECTORY_PATH=<path to upload>  # Директория хранения загруженных файлов (абсолютный путь)
SERVE_ROOT=/api/files/static            # Корневой путь для получения файлов
MONGO_HOST=localhost                    # Хост MongoDB
MONGO_PORT=27018                        # Порт MongoDB
MONGO_DB=fit-friends-file-vault         # Название БД в MongoDB для хранения пользователей
MONGO_USER=admin                        # Имя для пользователя MongoDB
MONGO_PASSWORD=test                     # Пароль для пользователя MongoDB
MONGO_AUTH_BASE=admin
```
##### \apps\fit\fit.env
```
PORT=3334                               # Порт на котором будет запущен сервис Fit

POSTGRES_USER=postgres                  # Имя пользователя для Postgres
POSTGRES_PASSWORD=postgres              # Пароль пользователя для Postgres
POSTGRES_DB=fit                         # Имя БД для Postgres
PGADMIN_DEFAULT_EMAIL=example@mail.com  # Имя пользователя для PgAdmin
PGADMIN_DEFAULT_PASSWORD=123456         # Пароль пользователя для PgAdmin
```
##### \libs\fit\models\prisma\ .env
```
# Строка подключения для Prisma
DATABASE_URL=postgres://postgres:postgres@localhost:5432/fit
```
#### Установка контейнеров Docker
##### Установить docker containers для сервиса аккаунтов (account)
```bash
docker compose --file ./apps/account/docker-compose.dev.yml --project-name "fit-friends-account" --env-file ./apps/account/account.env up -d
```
##### Установить docker containers для сервиса тренировок (fit)
```bash
docker compose --file ./apps/fit/docker-compose.dev.yml --env-file ./apps/fit/fit.env --project-name "fit-friends" up -d
```
##### Установить docker containers для сервиса хранения файлов (file-vault)
```bash
docker compose --file ./apps/file-vault/file-vault.compose.dev.yml --env-file ./apps/file-vault/file-vault.env --project-name "fit-friends-file-vault" up -d
```
#### Загрузить тестовые данные пользователей
```bash
npx nx run account:db:seed
```
#### Сгенерировать и выполнить скрипт создания моделей в БД Postgres
```bash
npx nx run fit:db:migrate
```
#### Сгенерировать клиент Prisma
```bash
npx nx run fit:db:generate
```
#### Загрузить тестовые данные тренировок
```bash
npx nx run fit:db:seed
```
## Запуск проекта
### Frontend
```bash
npm start
```
### Backend
```bash
npx nx run account:serve
npx nx run fit:serve
npx nx run file-vault:serve
npx nx run api:serve
```
