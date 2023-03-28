import {
  Controller,
  Get,
  Param,
  Query,
  Render,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
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

  @Get('/reserve')
  @Render('index')
  async reservationCalendar() {
    return { components: 'reservationCalendar' };
  }

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
  async community(@Query('page') page = 1, @Query('limit') limit = 5) {
    const reviews = await this.reviewService.paginate(
      Number(page ?? 1),
      Number(limit ?? 5),
    );
    return {
      components: 'community',
      reviews: reviews.data,
      reviewsMeta: reviews.meta,
      reviewsCreatedAt: reviews.createdAt,
    }; //이쪽
  }

  @Get('/review/:reviewId')
  @Render('index')
  async review(@Param('reviewId') reviewId: string) {
    return { components: 'review', reviewId };
  }

  @Get('/inquiry')
  @Render('index')
  async inquiry() {
    return { components: 'inquiry' };
  }

  @Get('/chatting')
  // @UseGuards(AuthGuard('jwt'))
  @Render('index')
  async chatting(@Req() req) {
    return {
      components: 'chatting',
      userId: req.user.id,
      socketChat: this.configService.get('SOCKET_NAMESPACE_CHAT'),
    };
  }

  @Get('/payment')
  @Render('index')
  async payment() {
    return { components: 'payment' };
  }
}
