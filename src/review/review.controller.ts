import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Render,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ApiTags } from '@nestjs/swagger';
//dto
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './review.entity';
import { number } from 'joi';
import { Pagination } from 'nestjs-typeorm-paginate';

@ApiTags('review')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // 리뷰목록 조회
  async all(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Promise<Review[]> {
    return await this.reviewService.paginate(Number(page), Number(limit));
  }

  //리뷰 상세 조회
  @Get('/:id')
  getReviewById(@Param('id') reviewId: number) {
    return this.reviewService.getReviewById(Number(reviewId));
  }

  // 리뷰 작성
  @Post('')
  createReview(@Body() data: CreateReviewDto) {
    return this.reviewService.createReview(
      data.orderId,
      data.userId,
      data.title,
      data.content,
    );
  }

  // 리뷰 수정
  @Put('/:id')
  updateReview(@Param('id') reviewId: number, @Body() data: UpdateReviewDto) {
    return this.reviewService.updateReview(reviewId, data.title, data.content);
  }

  // 리뷰 삭제
  @Delete('/:id')
  deleteReview(@Param('id') reviewId: number) {
    return this.reviewService.deleteReview(reviewId);
  }
}
