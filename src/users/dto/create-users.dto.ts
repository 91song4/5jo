import { IsDateString, IsNumber, IsString } from 'class-validator';

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
  readonly birthday: Date;

  @IsNumber()
  readonly password: string;
}
