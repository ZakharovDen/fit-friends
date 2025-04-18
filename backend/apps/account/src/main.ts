/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const SPEC_PATH = 'spec';
const GLOBAL_PREFIX = 'api';
const DEFAULT_PORT = 3333;

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('The «Account» service')
    .setDescription('Account service API')
    .setVersion('1.0')
    .build();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SPEC_PATH, app, document);
  const port = process.env.PORT || DEFAULT_PORT;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`);
  Logger.log(`API specification is running on: http://localhost:${port}/${SPEC_PATH}`);
}

bootstrap();
