import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@backend/fit-models';
import { FitTrainingController } from './fit-training.controller';
import { FitTrainingFactory } from './fit-training.factory';
import { FitTrainingRepository } from './fit-training.repository';
import { FitTrainingService } from './fit-training.service';
import { FitTrainingEntity } from './fit-training.entity';

@Module({
  imports: [PrismaClientModule],
  controllers: [FitTrainingController],
  providers: [FitTrainingFactory, FitTrainingRepository, FitTrainingService, FitTrainingEntity],
  exports: [FitTrainingService],
})
export class FitTrainingModule {}
