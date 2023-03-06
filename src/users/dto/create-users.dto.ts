import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateUsersInformationDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly userId: string;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly email: string;

  @IsDate()
  readonly birthDay: Date;

  @IsNumber()
  readonly password: string;
}
