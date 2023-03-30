import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepositWithoutBankbook } from './deposit-without-bankbook.entity';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';

@Injectable()
export class DepositWithoutBankbookService {
  constructor(
    @InjectRepository(DepositWithoutBankbook)
    private depositRepository: Repository<DepositWithoutBankbook>,
  ) {}

  // POST API
  async create(depositDto: CreateDepositDto): Promise<DepositWithoutBankbook> {
    const deposit = new DepositWithoutBankbook();
    deposit.orderId = depositDto.orderId;
    deposit.depositorName = depositDto.depositorName;
    deposit.accountHolderName = depositDto.accountHolderName;
    deposit.bankName = depositDto.bankName;
    deposit.accountNumber = depositDto.accountNumber;
    return this.depositRepository.save(deposit);
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
