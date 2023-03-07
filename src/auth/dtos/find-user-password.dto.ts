import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class FindUserPasswordDto extends PickType(CreateUserDto, [
  'userId',
  'email',
] as const) {}
