import { IsNumber, IsString } from 'class-validator';

export class CreateDepositDto {
  @IsNumber()
  readonly orderId: number;

  @IsString()
  readonly depositorName: string;

  @IsString()
  readonly accountHolderName: string | null;

  @IsString()
  readonly bankName: string | null;

  @IsString()
  readonly accountNumber: string | null;
}
