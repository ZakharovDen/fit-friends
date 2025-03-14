import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@backend/fit-models';

@Module({
  imports: [PrismaClientModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class FitTrainingModule {}
