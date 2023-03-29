import {
  Controller,
  Delete,
  Get,
  Put,
  Post,
  Body,
  Param,
  Logger,
  UseGuards,
  Query,
  Req,
  PreconditionFailedException,
} from '@nestjs/common';
import { json } from 'stream/consumers';
import { CreateUsersInformationDto } from './dto/create-users.dto';
import { DeleteUsersInformationDto } from './dto/delete-users.dto';
import { UpdateUsersInformationDto } from './dto/update-users.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
// routing path is /users -> http://localhost:3000/api
export class UsersController {
  // 서비스 주입을 해야됨.
  constructor(
    private readonly usersService: UsersService,
    private logger: Logger,
  ) {}

  // 유저 정보 조회 API

  @Get('/')
  async getUsersInformation(@Query() query) {
    return await this.usersService.getUsersInformation(query.page);
  }

  // 유저 정보 상세조회 API

  @Get('/:id')
  async getUsersInformationById(@Param('id') Id: number) {
    return await this.usersService.getUsersInformationById(Id);
  }

  // 유저 정보 수정 API
  @Put('/:id')
  async updateUsersInformation(
    @Param('id') id: number,
    @Body() data: UpdateUsersInformationDto,
  ) {
    try {
      // 해당 유저 정보를 어떤 내용으로 수정할까?
      console.log(id);
      this.logger.log(JSON.stringify(data));

      const result = await this.usersService.updateUsersInformation(
        id,
        data.name,
        data.phone,
        data.email,
        data.password,
      );
      return result;
    } catch (error) {
      throw new PreconditionFailedException(error.message);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async updateUser(@Req() req: any, @Body() data: UpdateUsersInformationDto) {
    // 해당 유저 정보를 어떤 내용으로 수정할까?
    this.logger.log(JSON.stringify(data));
    const { id } = req.user;

    return await this.usersService.updateUsersInformation(
      id,
      data.name,
      data.phone,
      data.email,
      data.password,
    );
  }

  // 유저 정보 삭제 API
  @Delete('/:id')
  async deleteUsersInformation(
    @Param('id') Id: number,
    // @Body() data: DeleteUsersInformationDto,
  ) {
    return await this.usersService.deleteUsersInformation(Id);
  }

  // 유저 정보 생성 API
  @Post('/')
  createUsersInformation(@Body() data: CreateUsersInformationDto) {
    return this.usersService.createUsersInformation(
      data.userId,
      data.name,
      data.phone,
      data.email,
      data.password,
      data.birthday,
    );
  }
}
