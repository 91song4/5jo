import { IsBoolean, IsDateString, IsNumber } from 'class-validator';

export class CreateReserveDto {
  @IsNumber()
  readonly campId: number;

  @IsDateString()
  readonly reservedDate: string;

  @IsBoolean()
  readonly isReserve: boolean;
}
