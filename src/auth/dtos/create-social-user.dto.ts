import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class CreateSocialUserDto {
  /**
   * @example 송지훈
   */
  @IsNotEmpty({ message: '빈 값이 들어있습니다' })
  @IsString()
  readonly name: string;

  /**
   * @example 010-1234-1111
   */

  @IsString()
  @Matches(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/)
  readonly phone: string;

  /**
   * @example song4@gmail.com
   */
  @IsNotEmpty({ message: '빈 값이 들어있습니다' })
  @IsEmail()
  readonly email: string;

  /**
   * @example 1911-11-11
   */
  @IsDateString()
  readonly birthday: Date;
}
