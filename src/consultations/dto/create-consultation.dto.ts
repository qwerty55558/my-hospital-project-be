import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const ConsultationCategoryEnum = z.enum([
  '시력교정 (라식/라섹)',
  '노안/백내장',
  '망막/녹내장',
  '드림렌즈/기타',
]);

const CreateConsultationSchema = z.object({
  name: z
    .string()
    .min(2, '성함은 2자 이상 입력해주세요.')
    .max(20, '성함은 20자 이하로 입력해주세요.'),
  phone: z
    .string()
    .regex(
      /^01[016789]-?\d{3,4}-?\d{4}$/,
      '올바른 휴대폰 번호 형식이 아닙니다.',
    ),
  doctorId: z.number().optional(),
  doctorName: z.string().max(20).optional(),
  category: ConsultationCategoryEnum,
  content: z
    .string()
    .min(10, '상담 내용은 10자 이상 입력해주세요.')
    .max(2000, '상담 내용은 2000자 이하로 입력해주세요.'),
  privacyAgreed: z
    .boolean()
    .refine((val) => val === true, '개인정보 수집 및 이용에 동의해주세요.'),
});

const AnswerConsultationSchema = z.object({
  answer: z.string().min(1, '답변 내용을 입력해주세요.'),
  status: z.enum(['answered', 'closed']).optional(),
});

export class CreateConsultationDto extends createZodDto(
  CreateConsultationSchema,
) {}

export class AnswerConsultationDto extends createZodDto(
  AnswerConsultationSchema,
) {}
