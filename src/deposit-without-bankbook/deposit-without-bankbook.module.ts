import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepositWithoutBankbook } from './deposit-without-bankbook.entity';
import { DepositWithoutBankbookService } from './deposit-without-bankbook.service';
import { DepositWithoutBankbookController } from './deposit-without-bankbook.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DepositWithoutBankbook])],
  controllers: [DepositWithoutBankbookController],
  providers: [DepositWithoutBankbookService],
  exports: [DepositWithoutBankbookService],
})
export class DepositWithoutBankbookModule {}
