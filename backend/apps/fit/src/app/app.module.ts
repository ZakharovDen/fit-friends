import { Module } from '@nestjs/common';
import { FitTrainingModule } from '@backend/fit-training';
import { FitConfigModule } from '@backend/fit-config';

@Module({
  imports: [
    FitTrainingModule,
    FitConfigModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
