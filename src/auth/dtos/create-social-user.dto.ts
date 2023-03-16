import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class CreateSocialUserDto {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly password: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @Matches(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/)
  readonly phone: string;

  @IsDateString()
  readonly birthday: Date;

  @IsString()
  readonly socialType: string;
}
