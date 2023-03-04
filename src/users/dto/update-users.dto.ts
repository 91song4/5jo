import { IsNumber, IsString } from 'class-validator';

export class UpdateUsersInformationDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly email: string;

  @IsNumber()
  readonly password: string;
}
