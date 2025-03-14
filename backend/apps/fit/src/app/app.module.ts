import { Module } from '@nestjs/common';
import { FitTrainingModule } from '@backend/fit-training';

@Module({
  imports: [FitTrainingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
