import { Test, TestingModule } from '@nestjs/testing';
import { DepositWithoutBankbookController } from './deposit-without-bankbook.controller';

describe('DepositWithoutBankbookController', () => {
  let controller: DepositWithoutBankbookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepositWithoutBankbookController],
    }).compile();

    controller = module.get<DepositWithoutBankbookController>(DepositWithoutBankbookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
