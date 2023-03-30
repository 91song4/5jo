import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { DepositWithoutBankbookService } from './deposit-without-bankbook.service';
import { DepositWithoutBankbook } from './deposit-without-bankbook.entity';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';

@Controller('deposits')
export class DepositWithoutBankbookController {
  constructor(private readonly depositService: DepositWithoutBankbookService) {}

  @Post()
  create(
    @Body() createDepositDto: CreateDepositDto,
  ): Promise<DepositWithoutBankbook> {
    return this.depositService.create(createDepositDto);
  }

  @Get()
  findAll(): Promise<DepositWithoutBankbook[]> {
    return this.depositService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<DepositWithoutBankbook> {
    return this.depositService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepositDto: UpdateDepositDto,
  ): Promise<DepositWithoutBankbook> {
    return this.depositService.update(Number(id), updateDepositDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.depositService.remove(Number(id));
  }
}
