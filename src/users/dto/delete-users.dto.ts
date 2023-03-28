import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersInformationDto } from './create-users.dto';

export class DeleteUsersInformationDto extends PartialType(
  CreateUsersInformationDto,
) {}
