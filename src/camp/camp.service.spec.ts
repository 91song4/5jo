import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Camp } from './camp.entity';
import { CampService } from './camp.service';

const mockCampRepository = () => {
  return { getCamps: jest.fn(), createCamp: jest.fn };
};
describe('CampService', () => {
  let campsService: CampService;
  // let campsReposirory: jest.Mocked<Repository<Camp>>;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CampService,
        // {
        //   provide: Repository<Camp>,
        //   useFactory: mockCampRepository,
        // },
      ],
    }).compile();

    campsService = module.get<CampService>(CampService);
    // campsReposirory = module.get(Repository<Camp>);
  });
  describe('create camp', () => {
    it('should create camp', async () => {
      const result = await campsService.createCamp('A1', 1, 4, 50000);
      expect(result).toBe({ name: 'A1', type: 1, headcount: 4, price: 50000 });
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
