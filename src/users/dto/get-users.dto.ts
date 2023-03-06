import { PickType } from '@nestjs/mapped-types';
import { CreateUsersInformationDto } from './create-users.dto';

export class GetUsersInformationDto extends PickType(
  CreateUsersInformationDto,
  ['name', 'phone', 'email', 'birthday'] as const,
) {}
