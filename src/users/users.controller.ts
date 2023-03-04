import {
  Controller,
  Delete,
  Get,
  Put,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { CreateUsersInformationDto } from './dto/create-users.dto';
import { DeleteUsersInformationDto } from './dto/delete-users.dto';
import { UpdateUsersInformationDto } from './dto/update-users.dto';
import { UsersService } from './users.service';

@Controller('api/users')
// routing path is /users -> http://localhost:3000/api
export class UsersController {
  // 서비스 주입을 해야됨.
  constructor(private readonly usersService: UsersService) {}

  // 유저 정보 조회 API
  @Get('/')
  async getUsersInformation() {
    return await this.usersService.getUsersInformation();
  }

  // 유저 정보 상세조회 API
  @Get('/:id')
  async getUsersInformationById(@Param('id') usersId: number) {
    return await this.usersService.getUsersInformationById(usersId);
  }

  // 유저 정보 수정 API
  @Put('/:id')
  async updateUsersInformation(
    @Param('id') usersId: number,
    @Body() data: UpdateUsersInformationDto,
  ) {
    // 해당 유저 정보를 어떤 내용으로 수정할까?
    return await this.usersService.updateUsersInformation(
      usersId,
      data.name,
      data.phone,
      data.email,
      data.password,
    );
  }

  // 유저 정보 삭제 API
  @Delete('/:id')
  async deleteUsersInformation(
    @Param('id') usersId: number,
    @Body() data: DeleteUsersInformationDto,
  ) {
    return await this.usersService.deleteUsersInformation(usersId);
  }

  // 유저 정보 생성 API
  @Post('/')
  createUsersInformation(@Body() data: CreateUsersInformationDto) {
    return this.usersService.createUsersInformation(
      data.name,
      data.phone,
      data.email,
      data.password,
    );
  }
}
