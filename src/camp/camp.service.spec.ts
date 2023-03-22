import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CampController } from './camp.controller';
import { Camp } from './camp.entity';
import { CampModule } from './camp.module';
import { CampService } from './camp.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmConfigService } from 'src/config/typeorm.config.service';

describe('CampService', () => {
  let service: CampService;
  let campRepository: Repository<Camp>;
  const USER_REPOSITORY_TOKEN = getRepositoryToken(Camp);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CampService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            insert: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<CampService>(CampService);
    campRepository = module.get<Repository<Camp>>(getRepositoryToken(Camp));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('campRepository should be defined', () => {
    expect(campRepository).toBeDefined();
  });
  describe('createCamp', () => {
    it('새로운 캠프 생성', async () => {
      await service.createCamp('B3', 2, 8, 200000);
      expect(campRepository.insert).toHaveBeenCalledWith({
        name: 'B3',
        type: 2,
        headcount: 8,
        price: 200000,
        isRepair: false,
      });
    });
  });
  describe('createCamp', () => {
    it('새로운 캠프 생성', async () => {
      await service.createCamp('B3', 2, 8, 200000);
      expect(campRepository.insert).toHaveBeenCalledWith({
        name: 'B3',
        type: 2,
        headcount: 8,
        price: 200000,
        isRepair: false,
      });
    });
  });
});
