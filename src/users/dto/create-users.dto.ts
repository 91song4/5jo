import { IsDate, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateUsersInformationDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly userId: string;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly email: string;

  @IsDateString()
  readonly birthDay: Date;

  @IsNumber()
  readonly password: string;
}
