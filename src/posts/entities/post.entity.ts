import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const POST_CATEGORIES = [
  '공지',
  '뉴스',
  '이벤트',
  '건강정보',
  '채용',
] as const;
export type PostCategory = (typeof POST_CATEGORIES)[number];

@Entity()
export class Post {
  @ApiProperty({ description: '게시글 고유 ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '게시글 카테고리',
    enum: POST_CATEGORIES,
    example: '공지',
  })
  @Column({ type: 'varchar', length: 20, default: '공지' })
  category: PostCategory;

  @ApiProperty({
    description: '게시글 제목',
    example: '2024년 설 연휴 진료 안내',
  })
  @Column({ type: 'varchar', length: 200 })
  title: string;

  @ApiProperty({
    description: '게시글 내용',
    example: '안녕하세요, 행복병원입니다. 설 연휴 기간 진료 안내드립니다.',
  })
  @Column('text')
  content: string;

  @ApiPropertyOptional({
    description: '게시글 요약 (목록용)',
    example: '설 연휴 기간(2/9~2/12) 휴진 안내입니다.',
  })
  @Column({ type: 'varchar', length: 300, nullable: true })
  summary: string;

  @ApiPropertyOptional({
    description: '썸네일 이미지 URL',
    example: 'https://example.com/images/thumbnail.jpg',
  })
  @Column({ type: 'varchar', length: 500, nullable: true })
  thumbnailUrl: string;

  @ApiProperty({ description: '작성자 ID (의사/관리자 ID)', example: 1 })
  @Column()
  authorId: number;

  @ApiProperty({ description: '상단 고정 여부', example: false })
  @Column({ type: 'boolean', default: false })
  isPinned: boolean;

  @ApiProperty({ description: '발행 여부', example: true })
  @Column({ type: 'boolean', default: true })
  isPublished: boolean;

  @ApiProperty({ description: '조회수', example: 0 })
  @Column({ type: 'int', default: 0 })
  viewCount: number;

  @ApiProperty({ description: '생성일시', example: '2024-01-01T00:00:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '수정일시', example: '2024-01-01T00:00:00.000Z' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiPropertyOptional({
    description: '발행일시',
    example: '2024-01-01T00:00:00.000Z',
  })
  @Column({ type: 'timestamp', nullable: true })
  publishedAt: Date;
}
