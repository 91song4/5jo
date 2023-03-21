import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CampController } from './camp.controller';
import { Camp } from './camp.entity';
import { CampService } from './camp.service';

// const mockCampRepository = () => {
//   return {};
// };
describe('CatsController', () => {
  let campController;
  let campService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CampController],
      providers: [CampService],
      // imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Camp])],
    }).compile();

    // campService = module.get(CampService);
    campController = module.get(CampController);
  });

  describe('getCamps', () => {
    it('should return an array of Camp', async () => {
      const result = campController.getCamps();
      expect(campController.getCamps()).toBe(result);
    });
  });
});
