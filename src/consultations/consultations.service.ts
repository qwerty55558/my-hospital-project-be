import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consultation } from './entities/consultation.entity';
import type { ConsultationStatus } from './entities/consultation.entity';
import {
  CreateConsultationDto,
  AnswerConsultationDto,
} from './dto/create-consultation.dto';

@Injectable()
export class ConsultationsService {
  constructor(
    @InjectRepository(Consultation)
    private readonly consultationRepository: Repository<Consultation>,
  ) {}

  /**
   * 상담 목록 조회 (최신순)
   */
  findAll(status?: ConsultationStatus) {
    const queryBuilder = this.consultationRepository
      .createQueryBuilder('consultation')
      .orderBy('consultation.createdAt', 'DESC');

    if (status) {
      queryBuilder.andWhere('consultation.status = :status', { status });
    }

    return queryBuilder.getMany();
  }

  /**
   * 상담 단건 조회
   */
  async findOne(id: number) {
    const consultation = await this.consultationRepository.findOneBy({ id });
    if (!consultation) {
      throw new NotFoundException(`Consultation with ID ${id} not found`);
    }
    return consultation;
  }

  /**
   * 상담 신청 생성
   */
  create(createConsultationDto: CreateConsultationDto) {
    const consultation = this.consultationRepository.create(
      createConsultationDto,
    );
    return this.consultationRepository.save(consultation);
  }

  /**
   * 상담 답변 등록
   */
  async answer(id: number, answerDto: AnswerConsultationDto) {
    const consultation = await this.findOne(id);

    consultation.answer = answerDto.answer;
    consultation.status = answerDto.status || 'answered';
    consultation.answeredAt = new Date();

    return this.consultationRepository.save(consultation);
  }

  /**
   * 상담 삭제
   */
  async remove(id: number) {
    const consultation = await this.findOne(id);
    return this.consultationRepository.remove(consultation);
  }

  /**
   * 상태별 상담 수 조회
   */
  async getCountByStatus() {
    const result = await this.consultationRepository
      .createQueryBuilder('consultation')
      .select('consultation.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('consultation.status')
      .getRawMany();

    return result;
  }
}
