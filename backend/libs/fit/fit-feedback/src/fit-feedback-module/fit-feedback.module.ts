import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@backend/fit-models';
import { FitFeedbackEntity } from './fit-feedback.entity';
import { FitFeedbackRepository } from './fit-feedback.repository';
import { FitFeedbackFactory } from './fit-feedback.factory';
import { FitFeedbackService } from './fit-feedback.service';
import { FitFeedbackController } from './fit-feedback.controller';
import { FitTrainingModule } from '@backend/fit-training';

@Module({
  imports: [PrismaClientModule, FitTrainingModule],
  controllers: [FitFeedbackController],
  providers: [FitFeedbackFactory, FitFeedbackRepository, FitFeedbackService, FitFeedbackEntity],
  exports: [FitFeedbackService],
})
export class FitFeedbackModule {}
