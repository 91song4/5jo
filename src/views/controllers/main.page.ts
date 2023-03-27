import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ReviewService } from 'src/review/review.service';

@Controller('view')
export class HomePage {
  constructor(
    private readonly configService: ConfigService,
    private readonly reviewService: ReviewService,
  ) {}
  // @Get('/home')
  // @Render('index')
  // async home() {
  //   return { components: 'home' };
  // }

  // @Get('/reserve')
  @Get('/reserve/:day')
  @Render('index')
  // async reserve() {
  async reserve(@Param('day') day: string) {
    // TODO - 1911-1-56 같은 걸로 못들어오게 예외처리
    return {
      components: 'reserve',
      socketReserve: this.configService.get('SOCKET_NAMESPACE_RESERVE'),
      day,
    };
  }

  @Get('/rooms')
  @Render('index')
  async rooms() {
    return { components: 'rooms' };
  }

  @Get('/community')
  @Render('index')
  async community(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    const reviews = await this.reviewService.paginate(
      Number(page ?? '1'),
      Number(limit ?? '5'),
    );
    return {
      components: 'community',
      reviews: reviews.data,
      reviewsMeta: reviews.meta,
      reviewsCreatedAt: reviews.createdAt,
    }; //이쪽
  }

  @Get('/review/:userId')
  @Render('index')
  async review(@Param('userId') userId: string) {
    return { components: 'review', userId };
  }
  @Get('/inquiry')
  @Render('index')
  async inquiry() {
    return { components: 'inquiry' };
  }

  @Get('/chatting')
  @Render('index')
  async chatting() {
    return {
      components: 'chatting',
      socketChat: this.configService.get('SOCKET_NAMESPACE_CHAT'),
    };
  }
}
