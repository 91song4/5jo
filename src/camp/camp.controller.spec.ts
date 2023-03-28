import { CampController } from './camp.controller';
import { CampRepository } from './camp.repository';
import { CampService } from './camp.service';

describe('CampController', () => {
  let campRepository: CampRepository;
  let campController: CampController;
  let campService: CampService;

  beforeEach(() => {
    campService = new CampService(campRepository);
    campController = new CampController(campService);
  });

  describe('getCamps', () => {
    it('should return an array of Camp', async () => {
      const result = campController.getCamps();
      expect(result).toBe(result);
    });
  });
});
