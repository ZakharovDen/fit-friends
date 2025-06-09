import { Module } from '@nestjs/common';
import { FitTrainingModule } from '@backend/fit-training';
import { FitConfigModule } from '@backend/fit-config';
import { FitFeedbackModule } from '@backend/fit-feedback';
import { FitOrderModule } from '@backend/fit-order';
import { FitRequestModule} from '@backend/fit-request';

@Module({
  imports: [
    FitTrainingModule,
    FitConfigModule,
    FitFeedbackModule,
    FitOrderModule,
    FitRequestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
