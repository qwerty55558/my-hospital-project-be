import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const PostCategoryEnum = z.enum([
  '공지',
  '뉴스',
  '이벤트',
  '건강정보',
  '채용',
]);

export type PostCategoryType = z.infer<typeof PostCategoryEnum>;

const CreatePostSchema = z.object({
  category: PostCategoryEnum.describe('게시글 카테고리'),
  title: z.string().max(200).describe('게시글 제목'),
  content: z.string().describe('게시글 내용'),
  summary: z.string().max(300).optional().describe('게시글 요약 (목록용)'),
  thumbnailUrl: z.string().max(500).optional().describe('썸네일 이미지 URL'),
  authorId: z.number().describe('작성자 ID (의사/관리자 ID)'),
  isPinned: z.boolean().default(false).describe('상단 고정 여부'),
  isPublished: z.boolean().default(true).describe('발행 여부'),
});

const UpdatePostSchema = CreatePostSchema.omit({ authorId: true }).partial();

export class CreatePostDto extends createZodDto(CreatePostSchema) {}
export class UpdatePostDto extends createZodDto(UpdatePostSchema) {}
