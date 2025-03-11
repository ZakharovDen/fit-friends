import { Module } from '@nestjs/common';
import { FileUploaderModule } from '@backend/file-uploader';
import { FileVaultConfigModule, getMongooseOptions } from '@backend/file-vault-config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    FileUploaderModule,
    FileVaultConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
