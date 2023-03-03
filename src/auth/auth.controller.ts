import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  

  @Post('/sign-up')
  async createUser(@Body() userDto: CreateUserDto) {
    return await this.authService.createUser(userDto);
  }
}
