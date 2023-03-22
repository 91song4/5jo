// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// import { CampController } from './camp.controller';
// import { Camp } from './camp.entity';
// import { CampModule } from './camp.module';
// import { CampService } from './camp.service';

// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmConfigService } from 'src/config/typeorm.config.service';

// describe('campsapis', () => {
//   let controller: CampController;
//   let service: CampService;

//   beforeEach(async () => {
//     const module = await Test.createTestingModule({
//       imports: [
//         ConfigModule.forRoot({ isGlobal: true }),
//         CampModule,
//         TypeOrmModule.forRootAsync({
//           imports: [ConfigModule],
//           useClass: TypeOrmConfigService,
//           inject: [ConfigService],
//         }),
//       ],
//       // controllers: [CampController],
//       // providers: [
//       //   CampService,
//       //   {
//       //     provide: getRepositoryToken(Camp),
//       //     useValue: {
//       //       save: jest.fn().mockResolvedValue(''),
//       //       find: jest.fn().mockResolvedValue(['']),
//       //     },
//       //   },
//       // ],
//     }).compile();
//     service = module.get<CampService>(CampService);
//     controller = module.get<CampController>(CampController);
//   });

//   // describe('getCamps', () => {
//   //   it('should return an array of Camp', async () => {
//   //     const result = controller.getCamps();
//   //     expect(result).toBe(4);
//   //   });
//   // });
//   describe('getCampById', () => {
//     it('id가 1 인 캠프 정보 불러오기', async () => {
//       const result = await service.getCampById(1);

//       expect(result.id).toEqual('1');
//     });
//   });
// });
