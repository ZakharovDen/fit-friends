import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AuthorRdo } from './author.rdo';
import { BlogPostRdo } from '@project/blog-post';

export class PostListRdo extends OmitType(BlogPostRdo, ['userId'] as const) {
  @Expose()
  @ApiProperty({ description: 'Автор' })
  public user: AuthorRdo;
}