import { IsDateString } from 'class-validator';

export class CheckReservationDto {
  @IsDateString()
  date: string;
}
