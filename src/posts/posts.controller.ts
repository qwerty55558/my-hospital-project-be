import {
  Controller,
  Get,
  Post as HttpPost,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './dto/create-post.dto';
import { Post, POST_CATEGORIES } from './entities/post.entity';
import type { PostCategory } from './entities/post.entity';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({
    summary: '게시글 목록 조회 (페이지네이션)',
    description:
      '게시글 목록을 조회합니다. 카테고리별 필터링, 페이지네이션이 가능합니다. 고정글이 상단에 표시됩니다.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: '페이지 번호 (기본값: 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: '페이지당 항목 수 (기본값: 10, 최대: 100)',
    example: 10,
  })
  @ApiQuery({
    name: 'category',
    required: false,
    enum: POST_CATEGORIES,
    description: '게시글 카테고리 필터',
  })
  @ApiResponse({
    status: 200,
    description: '게시글 목록 조회 성공',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'array', items: { $ref: '#/components/schemas/Post' } },
        meta: {
          type: 'object',
          properties: {
            total: { type: 'number', example: 50 },
            page: { type: 'number', example: 1 },
            limit: { type: 'number', example: 10 },
            totalPages: { type: 'number', example: 5 },
            hasNext: { type: 'boolean', example: true },
            hasPrev: { type: 'boolean', example: false },
          },
        },
      },
    },
  })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('category') category?: PostCategory,
  ) {
    // limit 최대값 제한
    const safeLimit = Math.min(limit, 100);
    return this.postsService.findAllPaginated(page, safeLimit, category);
  }

  @Get('categories/count')
  @ApiOperation({
    summary: '카테고리별 게시글 수 조회',
    description: '각 카테고리별 게시글 수를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '카테고리별 게시글 수 조회 성공',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          category: { type: 'string', example: '공지' },
          count: { type: 'string', example: '3' },
        },
      },
    },
  })
  getCountByCategory() {
    return this.postsService.getCountByCategory();
  }

  @Get(':id')
  @ApiOperation({
    summary: '게시글 단건 조회',
    description: 'ID로 특정 게시글을 조회합니다. 조회 시 조회수가 증가합니다.',
  })
  @ApiParam({ name: 'id', description: '게시글 ID', example: 1 })
  @ApiResponse({ status: 200, description: '게시글 조회 성공', type: Post })
  @ApiResponse({ status: 404, description: '게시글을 찾을 수 없음' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @HttpPost()
  @ApiOperation({
    summary: '게시글 생성',
    description: '새로운 게시글을 작성합니다.',
  })
  @ApiResponse({ status: 201, description: '게시글 생성 성공', type: Post })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '게시글 수정',
    description: '게시글 내용을 수정합니다.',
  })
  @ApiParam({ name: 'id', description: '게시글 ID', example: 1 })
  @ApiResponse({ status: 200, description: '게시글 수정 성공', type: Post })
  @ApiResponse({ status: 404, description: '게시글을 찾을 수 없음' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '게시글 삭제', description: '게시글을 삭제합니다.' })
  @ApiParam({ name: 'id', description: '게시글 ID', example: 1 })
  @ApiResponse({ status: 200, description: '게시글 삭제 성공', type: Post })
  @ApiResponse({ status: 404, description: '게시글을 찾을 수 없음' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }
}
