import { Test, TestingModule } from '@nestjs/testing';
import { CampService } from './camp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Camp } from './camp.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmConfigService } from '../config/typeorm.config.service';
import { CampRepository } from './camp.repository';

const mockCampRepository = () => {
  return { getCamps: jest.fn() };
};
describe('CampService', () => {
  let campsService: CampService;
  let campsReposirory: jest.Mocked<CampRepository>;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CampService,
        {
          provide: CampRepository,
          useFactory: mockCampRepository,
        },
      ],
    }).compile();

    campsService = module.get<CampService>(CampService);
    campsReposirory = module.get(CampRepository);
  });
  describe('creat camp', () => {
    it('should create camp', async () => {
      const result = await campsService.createCamp('A1', 1, 4, 50000);
      expect(result).toBe('A1');
    });
  });

  // it('should create camp', () => {
  //   const result = campsService.createCamp('A1', 1, 4, 50000);
  //   expect(campsService.createCamp('A1', 1, 4, 50000)).toBe('A1');
  // });

  // // 그룹
  // describe('캠프 관련 API', () => {
  //   // 테스트 하나
  //   it('캠프등록', async () => {
  // //given
  // //when
  // //then
  // });
  // });
});
