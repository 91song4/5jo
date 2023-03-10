import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class SendSMSDto extends PickType(CreateUserDto, ['phone'] as const) {}
