import { Injectable } from "@nestjs/common";
import { FitRequestRepository } from "./fit-request.repository";
import { FitRequestEntity } from "./fit-request.entity";
import { CreateFitRequestDto } from "./dto/create-fit-request.dto";
import { FitRequestQuery } from "./fit-request.query";
import { RequestStatus } from "@backend/core";
import { UpdateFitRequestDto } from "./dto/update-fit-request.dto";

@Injectable()
export class FitRequestService {
  constructor(
    private readonly fitRequestRepository: FitRequestRepository,
  ) { }

  public async create(dto: CreateFitRequestDto){
    const newRequest = new FitRequestEntity({...dto, status: RequestStatus.pending});
    await this.fitRequestRepository.save(newRequest);
    return newRequest;
  }

  public async update(id: string, dto: UpdateFitRequestDto) {
    const request = await this.fitRequestRepository.findById(id);
    request.status = dto.status;
    return this.fitRequestRepository.update(request);
  }

  public async getRequestByUserId(query: FitRequestQuery) {
    return this.fitRequestRepository.getRequestByUserId(query);
  }
}