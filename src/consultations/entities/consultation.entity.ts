import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const CONSULTATION_CATEGORIES = [
  '시력교정 (라식/라섹)',
  '노안/백내장',
  '망막/녹내장',
  '드림렌즈/기타',
] as const;

export type ConsultationCategory = (typeof CONSULTATION_CATEGORIES)[number];

export const CONSULTATION_STATUS = ['pending', 'answered', 'closed'] as const;
export type ConsultationStatus = (typeof CONSULTATION_STATUS)[number];

@Entity()
export class Consultation {
  @ApiProperty({ description: '상담 고유 ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '신청자 성함', example: '홍길동' })
  @Column({ type: 'varchar', length: 20 })
  name: string;

  @ApiProperty({ description: '연락처', example: '010-1234-5678' })
  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @ApiPropertyOptional({ description: '담당 의사 ID', example: 1 })
  @Column({ type: 'int', nullable: true })
  doctorId: number;

  @ApiPropertyOptional({ description: '담당 의사 이름', example: '김명안' })
  @Column({ type: 'varchar', length: 20, nullable: true })
  doctorName: string;

  @ApiProperty({
    description: '상담 분야',
    enum: CONSULTATION_CATEGORIES,
    example: '시력교정 (라식/라섹)',
  })
  @Column({ type: 'varchar', length: 50 })
  category: ConsultationCategory;

  @ApiProperty({
    description: '상담 내용',
    example: '라식 수술 비용이 궁금합니다.',
  })
  @Column({ type: 'text' })
  content: string;

  @ApiProperty({ description: '개인정보 동의 여부', example: true })
  @Column({ type: 'boolean', default: true })
  privacyAgreed: boolean;

  @ApiProperty({
    description: '상담 상태',
    enum: CONSULTATION_STATUS,
    example: 'pending',
  })
  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status: ConsultationStatus;

  @ApiPropertyOptional({ description: '답변 내용' })
  @Column({ type: 'text', nullable: true })
  answer: string;

  @ApiPropertyOptional({ description: '답변 일시' })
  @Column({ type: 'timestamp', nullable: true })
  answeredAt: Date;

  @ApiProperty({ description: '생성일시', example: '2025-01-01T00:00:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '수정일시', example: '2025-01-01T00:00:00.000Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
