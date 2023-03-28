import { IsNumber, IsString } from 'class-validator';

export class GetUsersInformationByIdDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly email: string;
}
