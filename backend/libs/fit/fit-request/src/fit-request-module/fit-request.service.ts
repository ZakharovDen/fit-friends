import { Injectable } from "@nestjs/common";
import { FitRequestRepository } from "./fit-request.repository";
import { FitRequestEntity } from "./fit-request.entity";
import { CreateRequestDto } from "./dto/create-request.dto";
import { FitRequestQuery } from "./fit-request.query";
import { RequestStatus } from "@backend/core";

@Injectable()
export class FitRequestService {
  constructor(
    private readonly fitRequestRepository: FitRequestRepository,
  ) { }

  public async create(dto: CreateRequestDto){
    const newRequest = new FitRequestEntity({...dto, status: RequestStatus.pending});
    await this.fitRequestRepository.save(newRequest);
    return newRequest;
  }

  public async getRequestByUserId(query: FitRequestQuery) {
    return this.fitRequestRepository.getRequestByUserId(query);
  }
}