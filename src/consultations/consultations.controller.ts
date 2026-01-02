import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ConsultationsService } from './consultations.service';
import {
  CreateConsultationDto,
  AnswerConsultationDto,
} from './dto/create-consultation.dto';
import {
  Consultation,
  CONSULTATION_STATUS,
} from './entities/consultation.entity';
import type { ConsultationStatus } from './entities/consultation.entity';

@ApiTags('consultations')
@Controller('consultations')
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Get()
  @ApiOperation({
    summary: '상담 목록 조회',
    description: '상담 목록을 조회합니다. 상태별 필터링이 가능합니다.',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: CONSULTATION_STATUS,
    description: '상담 상태 필터 (pending, answered, closed)',
  })
  @ApiResponse({
    status: 200,
    description: '상담 목록 조회 성공',
    type: [Consultation],
  })
  findAll(@Query('status') status?: ConsultationStatus) {
    return this.consultationsService.findAll(status);
  }

  @Get('status/count')
  @ApiOperation({
    summary: '상태별 상담 수 조회',
    description: '각 상태별 상담 수를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '상태별 상담 수 조회 성공',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'pending' },
          count: { type: 'string', example: '5' },
        },
      },
    },
  })
  getCountByStatus() {
    return this.consultationsService.getCountByStatus();
  }

  @Get(':id')
  @ApiOperation({
    summary: '상담 단건 조회',
    description: 'ID로 특정 상담을 조회합니다.',
  })
  @ApiParam({ name: 'id', description: '상담 ID', example: 1 })
  @ApiResponse({
    status: 200,
    description: '상담 조회 성공',
    type: Consultation,
  })
  @ApiResponse({ status: 404, description: '상담을 찾을 수 없음' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.consultationsService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: '상담 신청',
    description: '새로운 상담을 신청합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '상담 신청 성공',
    type: Consultation,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  create(@Body() createConsultationDto: CreateConsultationDto) {
    return this.consultationsService.create(createConsultationDto);
  }

  @Patch(':id/answer')
  @ApiOperation({
    summary: '상담 답변 등록',
    description: '상담에 답변을 등록합니다.',
  })
  @ApiParam({ name: 'id', description: '상담 ID', example: 1 })
  @ApiResponse({
    status: 200,
    description: '답변 등록 성공',
    type: Consultation,
  })
  @ApiResponse({ status: 404, description: '상담을 찾을 수 없음' })
  answer(
    @Param('id', ParseIntPipe) id: number,
    @Body() answerDto: AnswerConsultationDto,
  ) {
    return this.consultationsService.answer(id, answerDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '상담 삭제',
    description: '상담을 삭제합니다.',
  })
  @ApiParam({ name: 'id', description: '상담 ID', example: 1 })
  @ApiResponse({
    status: 200,
    description: '상담 삭제 성공',
    type: Consultation,
  })
  @ApiResponse({ status: 404, description: '상담을 찾을 수 없음' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.consultationsService.remove(id);
  }
}
