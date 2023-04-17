import _ from 'lodash';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { DataSource, Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Order } from 'src/order/order.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class ReviewService {
  reviewService: any;
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private dataSource: DataSource,
  ) {}

  // 리뷰 목록 조회
  async paginate(page: number = 1, limit: number = 5): Promise<any> {
    const [review, total] = await this.reviewRepository.findAndCount({
      select: ['id', 'userId', 'title', 'createdAt'],
      take: limit,
      skip: (page - 1) * limit,
    });

    const createdAt = review.map((element) => {
      const year = element.createdAt.getFullYear();
      const month = element.createdAt.getMonth();
      const date = element.createdAt.getDate();
      return `${year}-${month}-${date}`;
    });

    return {
      data: review,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
      createdAt,
    };
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
  async getReviewByUserId(userId: string) {
    try {
      const review = await this.reviewRepository.find({
        where: { userId },
      });
      return review;
    } catch (err) {
      console.log(err);
    }
  }

  //리뷰 작성
  async createReview(
    orderId: number,
    userId: string,
    title: string,
    content: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = await queryRunner.manager
        .getRepository(User)
        .find({ where: { id: parseInt(userId, 10) } });
      await queryRunner.manager.getRepository(Review).save({
        orderId,
        userId: user[0].name,
        title,
        content,
      });
      await queryRunner.manager
        .getRepository(Order)
        .update(orderId, { isReview: true });
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  //리뷰 수정
  async updateReview(
    id: number,
    title: string,
    content: string,
    userId: number,
  ) {
    const review = await this.reviewRepository.findOne({
      relations: {
        orders: true,
      },
      where: { id },
    });

    if (userId !== +review.orders.userId) {
      throw new UnauthorizedException();
    }

    return this.reviewRepository.update(id, {
      title,
      content,
    });
  }

  //리뷰 삭제
  async deleteReview(id: number) {
    this.reviewRepository.softDelete(id);
    return id;
  }
}
