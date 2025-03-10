import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ApplicationServiceURL } from "./app.config";
import { AuthorRdo } from "./rdo/author.rdo";
import { File, Post } from "@project/core";
import 'multer';
import { createUrlForFile } from "@project/helpers";
import FormData from 'form-data';

@Injectable()
export class AppService {
    constructor(
      private readonly httpService: HttpService,
    ) { }
  
  public async appendUser(posts: Post[]): Promise<void> {
    const usersIds = posts.map((post) => post.userId);
    const uniqUserIds = new Set(usersIds);

    const users: AuthorRdo[] = await Promise.all(
      Array.from(uniqUserIds).map(
        async (userId) => (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${userId}`)).data
      )
    );

    posts.forEach((post) => {
      post['user'] = users.find((user) => user.id === post.userId);
    });
  }

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