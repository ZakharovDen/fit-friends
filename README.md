## Учебный проект «Guitar Shop»

* Студент: [Денис Захаров](https://up.htmlacademy.ru/nodejs-2/8/user/2486641).

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
В файле .env опишите следующие переменные (пример .env-example):
```
PORT=5000                               # Порт на котором будет запущен бэкенд

POSTGRES_USER=postgres                  # Имя пользователя для Postgres
POSTGRES_PASSWORD=postgres              # Пароль пользователя для Postgres
POSTGRES_DB=guitar_shop                 # Имя БД для Postgres
POSTGRES_HOST=localhost                 # Хост Postgres
POSTGRES_PORT=5432                      # Порт Postgres
PGADMIN_DEFAULT_EMAIL=test@yandex.ru    # Имя пользователя для PgAdmin
PGADMIN_DEFAULT_PASSWORD=123456         # Пароль пользователя для PgAdmin

# Строка подключения для Prisma (менять не нужно)
DATABASE_URL=`postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`

UPLOAD_DIRECTORY_PATH=<path to upload>  # Директория хранения загруженных файлов (абсолютный путь)
SERVE_ROOT=/static                      # Корневой путь для получения файлов

MAIL_SMTP_HOST=localhost                # Хост для FakeSMTPServer
MAIL_USER_NAME=admin                    # Имя пользователя для FakeSMTPServer
MAIL_USER_PASSWORD=test                 # Пароль пользователя для FakeSMTPServer
MAIL_FROM=qwer@mail.com                 # Электронный адрес отправителя для FakeSMTPServer
MAIL_SMTP_PORT=8025                     # Порт для FakeSMTPServer

JWT_ACCESS_TOKEN_SECRET=jH3fdwefjoI24   # Секрет для JWT
JWT_ACCESS_TOKEN_EXPIRES_IN=30m         # Время жизни JWT токена
```
#### Установка контейнеров Docker
```bash
docker compose -f 'notify.docker.compose.dev.yml' up -d --build
docker compose -f 'postgres.docker.compose.dev.yml' up -d --build
```
#### Генерация тестовых данных
```bash
npm run start:cli -- -- --generate 50
```
## Запуск проекта
### Frontend
```bash
npm start
```
### Backend
```bash
npm run start:dev
```
