import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CampController } from './camp.controller';
import { CampService } from './camp.service';
import { Camp } from './camp.entity';
import { CampRepository } from './camp.repository';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from '../config/typeorm.config.service';
import { ConfigService } from '@nestjs/config';

describe('CampController', () => {
  let campController: CampController;
  let campService: CampService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([CampRepository]),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useClass: TypeOrmConfigService,
          inject: [ConfigService],
        }),
      ],
      controllers: [CampController],
      providers: [CampService],
    }).compile();

    campService = module.get<CampService>(CampService);
    campController = module.get<CampController>(CampController);
  });

  describe('getCamps', () => {
    it('모든 캠프 정보 가져오기', () => {
      // given
      const result = campController.getCamps();
      // when

      // then
      expect(result).toBeUndefined;
    });
  });
});
