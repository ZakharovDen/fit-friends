import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ApplicationServiceURL } from "./app.config";
import { Feedback, File, UserRole } from "@backend/core";
import 'multer';
import { createUrlForFile } from "@backend/helpers";
import FormData from 'form-data';
import { UserRdo } from "@backend/authentications";
import { FeedbackWithUserRdo } from "./rdo/feedback-with-user.rdo";

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

  public async appendUser(feedbacks: Feedback[]): Promise<FeedbackWithUserRdo[]> {
    const usersIds = feedbacks.map((feedback) => feedback.userId);
    const uniqUserIds = new Set(usersIds);

    const users: UserRdo[] = await Promise.all(
      Array.from(uniqUserIds).map(
        async (userId) => (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${userId}`)).data
      )
    );
    const feedbacksWithUser: FeedbackWithUserRdo[] = [];
    feedbacks.forEach((feedback) => {
      feedbacksWithUser.push({
        id: feedback.id,
        trainingId: feedback.trainingId,
        createdAt: feedback.createdAt,
        rating: feedback.rating,
        text: feedback.text,
        updatedAt: feedback.createdAt,
        user: users.find((user) => user.id === feedback.userId)
      })
    });
    return feedbacksWithUser;
  }

  public async matchRoles(roles: UserRole[], role: UserRole){
    return roles.includes(role);
  }
}