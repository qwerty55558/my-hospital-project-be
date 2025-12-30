import {
  ApiProperty,
  ApiPropertyOptional,
  PartialType,
  OmitType,
} from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: '게시글 제목',
    example: '첫 번째 게시글',
  })
  title: string;

  @ApiProperty({
    description: '게시글 내용',
    example: '게시글 본문 내용입니다.',
  })
  content: string;

  @ApiProperty({
    description: '작성자 ID (의사 ID)',
    example: 1,
  })
  authorId: number;
}

export class UpdatePostDto extends PartialType(
  OmitType(CreatePostDto, ['authorId'] as const),
) {}
