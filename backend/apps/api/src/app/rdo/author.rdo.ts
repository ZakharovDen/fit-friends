import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { AuthorFieldDescription } from "../constant";

export class AuthorRdo {
  @Expose()
  @ApiProperty(AuthorFieldDescription.Id)
  public id: string;

  @Expose()
  @ApiProperty(AuthorFieldDescription.Name)
  public name: string;

  @Expose()
  @ApiProperty(AuthorFieldDescription.Email)
  public email: string;
}