import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUsersInformationDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly email: string;

  @IsNotEmpty({ message: '빈 값이 들어있습니다' })
  @IsString()
  readonly password: string;
}
