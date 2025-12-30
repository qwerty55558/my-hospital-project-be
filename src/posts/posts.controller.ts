import {
  Controller,
  Get,
  Post as HttpPost,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({
    summary: '게시글 목록 조회',
    description: '모든 게시글 목록을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '게시글 목록 조회 성공',
    type: [Post],
  })
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '게시글 단건 조회',
    description: 'ID로 특정 게시글을 조회합니다.',
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
