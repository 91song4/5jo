import { IsNumber, IsString } from 'class-validator';

export class CreateUsersInformationDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly email: string;

  @IsNumber()
  readonly password: string;
}
