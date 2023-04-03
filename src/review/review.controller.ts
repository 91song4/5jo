import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ApiTags } from '@nestjs/swagger';
//dto
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './review.entity';

@ApiTags('review')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // 리뷰목록 조회
  @Get()
  async all(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Promise<Review[]> {
    return await this.reviewService.paginate(Number(page), Number(limit));
  }

  //리뷰 상세 조회
  @Get(':id')
  getReviewById(@Param('id') reviewId: number) {
    return this.reviewService.getReviewById(Number(reviewId));
  }

  // 내 리뷰 조회
  @Get('/myreview/:id')
  getReviewByUserId(@Param('id') userId: string) {
    return this.reviewService.getReviewByUserId(userId);
  }

  // 리뷰 작성
  @Post()
  async createReview(@Req() req, @Body() data: CreateReviewDto) {
    return await this.reviewService.createReview(
      data.orderId,
      req.user,
      data.title,
      data.content,
    );
  }

  // 리뷰 수정
  @Put(':id')
  async updateReview(
    @Param('id') reviewId: number,
    @Body() data: UpdateReviewDto,
    @Req() req: any,
  ) {
    const userId = parseInt(req.user, 10);
    return await this.reviewService.updateReview(
      reviewId,
      data.title,
      data.content,
      userId,
    );
  }

  // 리뷰 삭제
  @Delete(':id')
  async deleteReview(@Param('id') reviewId: number) {
    return await this.reviewService.deleteReview(reviewId);
  }
}
