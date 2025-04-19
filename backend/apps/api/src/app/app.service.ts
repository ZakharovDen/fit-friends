import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ApplicationServiceURL } from "./app.config";
import { Feedback, File, UserRole } from "@backend/core";
import 'multer';
import { createUrlForFile } from "@backend/helpers";
import FormData from 'form-data';
import { UserRdo } from "@backend/authentications";

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

  public async appendUser(feedbacks: Feedback[]): Promise<void> {
    const usersIds = feedbacks.map((feedback) => feedback.userId);
    const uniqUserIds = new Set(usersIds);

    const users: UserRdo[] = await Promise.all(
      Array.from(uniqUserIds).map(
        async (userId) => (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${userId}`)).data
      )
    );

    feedbacks.forEach((feedback) => {
      feedback['user'] = users.find((user) => user.id === feedback.userId);
    });
  }

  public async matchRoles(roles: UserRole[], role: UserRole){
    return roles.includes(role);
  }
}