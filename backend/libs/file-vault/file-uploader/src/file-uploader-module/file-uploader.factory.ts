import { Injectable } from '@nestjs/common';
import { FileUploaderEntity } from './file-uploader.entity';
import { EntityFactory, File } from '@project/core';


@Injectable()
export class FileUploaderFactory implements EntityFactory<FileUploaderEntity> {
  public create(entityPlainData: File): FileUploaderEntity {
    return new FileUploaderEntity(entityPlainData);
  }
}