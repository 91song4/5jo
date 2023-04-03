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
            find: jest.fn(),
            update: jest.fn(),
            softDelete: jest.fn(),
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
  describe('getCamps', () => {
    it('전체 캠프 조회', async () => {
      await service.getCamps(1);
      expect(campRepository.find).toHaveBeenCalledWith({ skip: 0, take: 15 });
    });
  });
  describe('getCampById', () => {
    it('캠프 상세 조회', async () => {
      await service.getCampById(4);
      expect(campRepository.findOne).toHaveBeenCalledWith({ where: { id: 4 } });
    });
  });
  describe('updateCamp', () => {
    it('캠프 정보 수정', async () => {
      await service.updateCamp(4, 'BBB', 4, 12, 150000, true, '2023-04-04');
      expect(campRepository.update).toHaveBeenCalledWith(4, {
        name: 'BBB',
        type: 4,
        headcount: 12,
        price: 150000,
        isRepair: true,
        repairEndDate: '2023-04-04',
      });
    });
  });
  describe('deleteCamp', () => {
    it('캠프 삭제', async () => {
      await service.deleteCamp(4);
      expect(campRepository.softDelete).toHaveBeenCalledWith(4);
    });
  });
});
