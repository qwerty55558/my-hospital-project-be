import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Post {
  @ApiProperty({ description: '게시글 고유 ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '게시글 제목', example: '첫 번째 게시글' })
  @Column()
  title: string;

  @ApiProperty({
    description: '게시글 내용',
    example: '게시글 본문 내용입니다.',
  })
  @Column('text')
  content: string;

  @ApiProperty({ description: '작성자 ID (의사 ID)', example: 1 })
  @Column()
  authorId: number;

  @ApiProperty({ description: '생성일시', example: '2024-01-01T00:00:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;
}
