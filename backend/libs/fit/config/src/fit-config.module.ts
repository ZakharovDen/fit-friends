import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import applicationConfig from './configurations/app.config';

const ENV_FIT_FILE_PATH = 'apps/fit/fit.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig],
      envFilePath: ENV_FIT_FILE_PATH
    }),
  ]
})
export class FitConfigModule {}
