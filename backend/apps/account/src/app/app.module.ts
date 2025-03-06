import { Module } from '@nestjs/common';
import { AuthenticationModule } from '@backend/authentications';
import { UserModule } from '@backend/user';
import { AccountConfigModule, getMongooseOptions } from '@backend/account-config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthenticationModule,
    UserModule,
    AccountConfigModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    ),
    //NotifyModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
