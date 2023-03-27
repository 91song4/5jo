import _ from 'lodash';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository } from 'typeorm';
import { number } from 'joi';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  // 리뷰 목록 조회
  async getReviews() {
    return await this.reviewRepository.find({
      where: { deletedAt: null },
      select: ['id', 'content', 'title'],
    });
  }

  //리뷰 상세 조회
  async getReviewById(id: number) {
    try {
      const review = await this.reviewRepository.findOne({
        where: { id },
      });
      return review;
    } catch (err) {
      console.log(err);
    }
  }

  //리뷰 작성
  createReview(
    orderId: number,
    userId: string,
    title: string,
    content: string,
  ) {
    const review = this.reviewRepository.insert({
      orderId,
      userId,
      title,
      content,
    });
  }

  //리뷰 수정
  updateReview(id: number, title: string, content: string) {
    return this.reviewRepository.update(id, {
      title,
      content,
    });
  }

  //리뷰 삭제
  deleteReview(id: number) {
    this.reviewRepository.softDelete(id);
    return id;
  }
}
