import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpClientSettings } from './app.config';
import { UsersController } from './users.controller';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { AppService } from './app.service';
import { FitController } from './fit.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: HttpClientSettings.Timeout,
      maxRedirects: HttpClientSettings.MaxRedirects,
    }),
  ],
  controllers: [UsersController, FitController],
  providers: [CheckAuthGuard, AppService],
})
export class AppModule { }
