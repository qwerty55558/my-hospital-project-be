import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty({
    description: '의사 이름',
    example: '김철수',
  })
  name: string;

  @ApiProperty({
    description: '전문 분야',
    example: '내과',
  })
  specialty: string;

  @ApiPropertyOptional({
    description: '의사 소개',
    example: '내과 전문의, 소화기 질환 전문',
  })
  description?: string;

  @ApiPropertyOptional({
    description: '대표 의사 여부',
    example: false,
    default: false,
  })
  isRepresentative?: boolean;

  @ApiPropertyOptional({
    description: '프로필 이미지 URL',
    example: '/images/doctors/doctor1.jpg',
  })
  profileImage?: string;

  @ApiPropertyOptional({
    description: '학력 (배열)',
    example: ['서울대학교 의과대학 졸업', '서울대학교 대학원 의학박사'],
  })
  education?: string[];

  @ApiPropertyOptional({
    description: '경력 (배열)',
    example: ['서울대학교병원 안과 전공의', '현 밝은눈안과 원장'],
  })
  career?: string[];

  @ApiPropertyOptional({
    description: '자격/수상 (배열)',
    example: ['대한안과학회 정회원', '미국안과학회(AAO) 정회원'],
  })
  certifications?: string[];
}

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {}
