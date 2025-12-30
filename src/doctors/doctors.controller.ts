import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto, UpdateDoctorDto } from './dto/create-doctor.dto';
import { Doctor } from './entities/doctor.entity';

@ApiTags('doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  @ApiOperation({
    summary: '의사 목록 조회',
    description: '모든 의사 목록을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '의사 목록 조회 성공',
    type: [Doctor],
  })
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get('representatives')
  @ApiOperation({
    summary: '대표 의사 목록 조회',
    description: '대표 의사로 지정된 의사만 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '대표 의사 목록 조회 성공',
    type: [Doctor],
  })
  findRepresentatives() {
    return this.doctorsService.findRepresentatives();
  }

  @Get(':id')
  @ApiOperation({
    summary: '의사 단건 조회',
    description: 'ID로 특정 의사를 조회합니다.',
  })
  @ApiParam({ name: 'id', description: '의사 ID', example: 1 })
  @ApiResponse({ status: 200, description: '의사 조회 성공', type: Doctor })
  @ApiResponse({ status: 404, description: '의사를 찾을 수 없음' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.doctorsService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: '의사 생성',
    description: '새로운 의사를 등록합니다.',
  })
  @ApiResponse({ status: 201, description: '의사 생성 성공', type: Doctor })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '의사 정보 수정',
    description: '의사 정보를 수정합니다.',
  })
  @ApiParam({ name: 'id', description: '의사 ID', example: 1 })
  @ApiResponse({ status: 200, description: '의사 수정 성공', type: Doctor })
  @ApiResponse({ status: 404, description: '의사를 찾을 수 없음' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    return this.doctorsService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '의사 삭제', description: '의사를 삭제합니다.' })
  @ApiParam({ name: 'id', description: '의사 ID', example: 1 })
  @ApiResponse({ status: 200, description: '의사 삭제 성공', type: Doctor })
  @ApiResponse({ status: 404, description: '의사를 찾을 수 없음' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.doctorsService.remove(id);
  }
}
