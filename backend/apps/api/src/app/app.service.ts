import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ApplicationServiceURL } from "./app.config";
import { File } from "@backend/core";
import 'multer';
import { createUrlForFile } from "@backend/helpers";
import FormData from 'form-data';

@Injectable()
export class AppService {
    constructor(
      private readonly httpService: HttpService,
    ) { }

  public async uploadFile(file: Express.Multer.File) {
    const formData = new FormData();
    formData.append('file', file.buffer, file.originalname);
    const { data: fileMetaData } = await this.httpService.axiosRef.post<File>(
      `${ApplicationServiceURL.File}/upload`,
      formData,
      {
        headers: formData.getHeaders(),
      }
    );
    return createUrlForFile(fileMetaData, ApplicationServiceURL.File);
  }
}