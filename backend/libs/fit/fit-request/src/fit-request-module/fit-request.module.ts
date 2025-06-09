import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@backend/fit-models';
import { FitRequestEntity } from './fit-request.entity';
import { FitTrainingModule } from '@backend/fit-training';
import { FitRequestService } from './fit-request.service';
import { FitRequestRepository } from './fit-request.repository';
import { FitRequestFactory } from './fit-request.factory';
import { FitRequestController } from './fit-request.controller';

@Module({
  imports: [PrismaClientModule, FitTrainingModule],
  controllers: [FitRequestController],
  providers: [FitRequestFactory, FitRequestRepository, FitRequestService, FitRequestEntity],
  exports: [FitRequestService],
})
export class FitRequestModule {}
