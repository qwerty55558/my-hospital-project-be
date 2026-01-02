import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import type { PostCategory } from './entities/post.entity';
import { CreatePostDto, UpdatePostDto } from './dto/create-post.dto';

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  /**
   * 게시글 목록 조회 (고정글 우선, 최신순)
   */
  findAll(category?: PostCategory, onlyPublished: boolean = true) {
    const queryBuilder = this.postRepository
      .createQueryBuilder('post')
      .orderBy('post.isPinned', 'DESC')
      .addOrderBy('post.createdAt', 'DESC');

    if (category) {
      queryBuilder.andWhere('post.category = :category', { category });
    }

    if (onlyPublished) {
      queryBuilder.andWhere('post.isPublished = :isPublished', {
        isPublished: true,
      });
    }

    return queryBuilder.getMany();
  }

  /**
   * 게시글 목록 조회 (페이지네이션)
   */
  async findAllPaginated(
    page: number = 1,
    limit: number = 10,
    category?: PostCategory,
    onlyPublished: boolean = true,
  ): Promise<PaginatedResult<Post>> {
    const offset = (page - 1) * limit;

    const queryBuilder = this.postRepository
      .createQueryBuilder('post')
      .orderBy('post.createdAt', 'DESC')
      .skip(offset)
      .take(limit);

    if (category) {
      queryBuilder.andWhere('post.category = :category', { category });
    }

    if (onlyPublished) {
      queryBuilder.andWhere('post.isPublished = :isPublished', {
        isPublished: true,
      });
    }

    const [data, total] = await queryBuilder.getManyAndCount();
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  /**
   * 게시글 단건 조회 (조회수 증가)
   */
  async findOne(id: number, incrementView: boolean = true) {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);

    if (incrementView) {
      await this.postRepository.increment({ id }, 'viewCount', 1);
      post.viewCount += 1;
    }

    return post;
  }

  /**
   * 게시글 생성
   */
  create(createPostDto: CreatePostDto) {
    const post = this.postRepository.create({
      ...createPostDto,
      publishedAt: createPostDto.isPublished !== false ? new Date() : undefined,
    });
    return this.postRepository.save(post);
  }

  /**
   * 게시글 수정
   */
  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id, false);

    // 발행 상태로 변경 시 publishedAt 설정
    if (updatePostDto.isPublished === true && !post.publishedAt) {
      post.publishedAt = new Date();
    }

    Object.assign(post, updatePostDto);
    return this.postRepository.save(post);
  }

  /**
   * 게시글 삭제
   */
  async remove(id: number) {
    const post = await this.findOne(id, false);
    return this.postRepository.remove(post);
  }

  /**
   * 카테고리별 게시글 수 조회
   */
  async getCountByCategory() {
    const result = await this.postRepository
      .createQueryBuilder('post')
      .select('post.category', 'category')
      .addSelect('COUNT(*)', 'count')
      .where('post.isPublished = :isPublished', { isPublished: true })
      .groupBy('post.category')
      .getRawMany();

    return result;
  }
}
