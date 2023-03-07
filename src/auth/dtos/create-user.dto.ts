import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  /**
   * @example song4
   */
  @IsNotEmpty({ message: '빈 값이 들어있습니다' })
  @IsString()
  readonly userId: string;

  /**
   * @example 1234
   */
  @IsNotEmpty({ message: '빈 값이 들어있습니다' })
  @IsString()
  readonly password: string;

  /**
   * @example 송지훈
   */
  @IsNotEmpty({ message: '빈 값이 들어있습니다' })
  @IsString()
  readonly name: string;

  /**
   * @example 010-1234-1111
   */
  @IsNotEmpty({ message: '빈 값이 들어있습니다' })
  @IsString()
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
  @IsNotEmpty({ message: '빈 값이 들어있습니다' })
  @IsDateString()
  readonly birthday: Date;
}
