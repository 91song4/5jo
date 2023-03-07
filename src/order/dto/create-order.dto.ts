import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly campId: number;

  @IsDateString()
  readonly selectedDay: Date;

  @IsNumber()
  readonly headcount: number;

  @IsNumber()
  readonly receipt: number;
}
