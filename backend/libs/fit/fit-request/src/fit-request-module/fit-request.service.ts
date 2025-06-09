import { Injectable } from "@nestjs/common";
import { FitTrainingService } from '@backend/fit-training';
import { FitRequestRepository } from "./fit-request.repository";
import { FitRequestEntity } from "./fit-request.entity";
import { CreateRequestDto } from "./dto/create-request.dto";

@Injectable()
export class FitRequestService {
  constructor(
    private readonly fitRequestRepository: FitRequestRepository,
    private readonly fitTrainingService: FitTrainingService,
  ) { }

  public async create(dto: CreateRequestDto){
    // await this.fitTrainingService.findById(dto.trainingId);
    // const newRequest = new FitRequestEntity(dto);
    // await this.fitRequestRepository.save(newRequest);
    // return newRequest;
  }
}