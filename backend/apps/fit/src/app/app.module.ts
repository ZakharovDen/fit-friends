import { Module } from '@nestjs/common';
import { FitTrainingModule } from '@backend/fit-training';
import { FitConfigModule } from '@backend/fit-config';
import { FitFeedbackModule } from '@backend/fit-feedback';
import { FitOrderModule } from '@backend/fit-order';

@Module({
  imports: [
    FitTrainingModule,
    FitConfigModule,
    FitFeedbackModule,
    FitOrderModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
