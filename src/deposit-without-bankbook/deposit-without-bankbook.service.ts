import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepositWithoutBankbook } from './deposit-without-bankbook.entity';
import { UpdateDepositDto } from './dto/update-deposit.dto';

@Injectable()
export class DepositWithoutBankbookService {
  constructor(
    @InjectRepository(DepositWithoutBankbook)
    private readonly depositRepository: Repository<DepositWithoutBankbook>,
  ) {}

  // POST API
  async create(
    orderId: number,
    depositorName: string,
    accountHolderName: string,
    bankName: string,
    accountNumber: string,
  ) {
    const DepositWithoutBankbook = this.depositRepository.insert({
      orderId,
      depositorName,
      accountHolderName,
      bankName,
      accountNumber,
    });
    return DepositWithoutBankbook;
  }

  // GET API FOR ALL
  async findAll(): Promise<DepositWithoutBankbook[]> {
    return this.depositRepository.find();
  }

  // GET API FOR ONE
  async findOne(id: number): Promise<DepositWithoutBankbook> {
    return this.depositRepository.findOne({ where: { id } });
  }

  // PUT API
  async update(
    id: number,
    depositDto: UpdateDepositDto,
  ): Promise<DepositWithoutBankbook> {
    const deposit = await this.depositRepository.findOne({ where: { id } });
    deposit.orderId = depositDto.orderId;
    deposit.depositorName = depositDto.depositorName;
    deposit.accountHolderName = depositDto.accountHolderName;
    deposit.bankName = depositDto.bankName;
    deposit.accountNumber = depositDto.accountNumber;
    return this.depositRepository.save(deposit);
  }

  // DELETE API
  async remove(id: number): Promise<void> {
    await this.depositRepository.delete(id);
  }
}
