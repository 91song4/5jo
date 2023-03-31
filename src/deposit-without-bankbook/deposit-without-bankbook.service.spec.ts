import { Test, TestingModule } from '@nestjs/testing';
import { DepositWithoutBankbookService } from './deposit-without-bankbook.service';

describe('DepositWithoutBankbookService', () => {
  let service: DepositWithoutBankbookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepositWithoutBankbookService],
    }).compile();

    service = module.get<DepositWithoutBankbookService>(DepositWithoutBankbookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
