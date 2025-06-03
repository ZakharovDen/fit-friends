import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class AddFriendDto {
  @ApiProperty({description: 'Идентификатор друга'})
  @IsMongoId()
  friendId: string;
}