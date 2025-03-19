import { Module } from '@nestjs/common';
import { FitTrainingModule } from '@backend/fit-training';
import { FitConfigModule } from '@backend/fit-config';
import { FitFeedbackModule } from '@backend/fit-feedback';

@Module({
  imports: [
    FitTrainingModule,
    FitConfigModule,
    FitFeedbackModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
