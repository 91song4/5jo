import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
//dto
import { CreateReviewDto } from './dto/create-review.dto';
import { DeleteReviewDto } from './dto/delete-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@ApiTags('review')
@Controller('')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // 리뷰목록 조회
  @Get('/reviews')
  async getReviews() {
    return await this.reviewService.getReviews();
  }

  //리뷰 상세 조회
  @Get('/reviews/:id')
  getReviewById(@Param('id') reviewId: number) {
    return this.reviewService.getReviewById(Number(reviewId));
  }

  // 리뷰 작성
  @Post('/reviews')
  createReview(@Body() data: CreateReviewDto) {
    return this.reviewService.createReview(
      data.orderId,
      data.userId,
      data.title,
      data.content,
    );
  }

  // 리뷰 수정
  @Put('/reviews/:id')
  updateReview(@Param('id') reviewId: number, @Body() data: UpdateReviewDto) {
    return this.reviewService.updateReview(reviewId, data.title, data.content);
  }

  // 리뷰 삭제
  @Delete('/reviews/:id')
  deleteReview(@Param('id') reviewId: number) {
    return this.reviewService.deleteReview(reviewId);
  }
}
