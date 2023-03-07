import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampModule } from './camp/camp.module';
import { CampService } from './camp/camp.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CampModule],
      controllers: [AppController],
      providers: [AppService, CampService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe.only('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
