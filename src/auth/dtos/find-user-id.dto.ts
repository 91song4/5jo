import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class FindUserIdDto extends PickType(CreateUserDto, [
  'name',
  'email',
] as const) {}
