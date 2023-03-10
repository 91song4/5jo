import { Controller, Get, Param, Render } from '@nestjs/common';
import { CampService } from 'src/camp/camp.service';
import { CouponService } from 'src/coupon/coupon.service';
import { UsersService } from 'src/users/users.service';

@Controller('view')
export class HomePage {
  constructor(
    private readonly campService: CampService,
    private readonly couponService: CouponService,
    private readonly usersService: UsersService,
  ) {}

  // @Get('/home')
  // @Render('index')
  // async home() {
  //   return { components: 'home' };
  // }

  @Get('/reserve')
  @Render('index')
  async reserve() {
    return { components: 'reserve' };
  }

  @Get('/rooms')
  @Render('index')
  async rooms() {
    return { components: 'rooms' };
  }

  @Get('/community')
  @Render('index')
  async community() {
    return { components: 'community' };
  }

  @Get('/inquiry')
  @Render('index')
  async inquiry() {
    return { components: 'inquiry' };
  }
  @Get('/mypage/:id')
  @Render('index')
  async mypage(@Param('id') userId: number) {
    const userInfo = await this.usersService.getUsersInformationById(userId);
    return { components: 'mypage', userInfo };
  }
}
