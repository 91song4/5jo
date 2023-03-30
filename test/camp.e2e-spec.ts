import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request, { agent, SuperTest } from 'supertest';
import { AppModule } from './../src/app.module';
import cookieParser from 'cookie-parser';
import { CampModule } from 'src/camp/camp.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import supertest from 'supertest';
import { Repository } from 'typeorm';
import { Camp } from 'src/camp/camp.entity';
import { CampDummy } from './dummy/camp.dummy';
import { before } from 'node:test';

describe('CampController (e2e)', () => {
  let app: INestApplication;
  let module: TestingModule;
  let server: SuperTest<request.Test>;
  let campRepository: Repository<Camp>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: ':memory:',
          autoLoadEntities: true,
          synchronize: true,
          logging: false,
        }),
        CampModule,
      ],
    }).compile();

    app = module.createNestApplication();
    server = supertest(app.getHttpServer());
    campRepository = module.get(getRepositoryToken(Camp));
    await app.init();

    await campRepository.insert(CampDummy);
  });

  afterAll(async () => {
    await app.close();
  });
  test('캠프 목록 조회', async () => {
    // Given
    const url = '/camps';
    const { id, name, type, headcount, price, repairEndDate, isRepair } =
      CampDummy[11];

    // When
    const res = await server.get(url);

    // Then
    expect(res.body.length).toEqual(12);
    expect(res.body[11]).toEqual(
      expect.objectContaining({
        id,
        name,
        type,
        headcount,
        price,
        repairEndDate,
        isRepair,
      }),
    );
  });
  test('캠프 상세 조회 (14번)', async () => {
    // Given
    const url = '/camps/14';
    const { id, name, type, headcount, price, repairEndDate, isRepair } =
      CampDummy[13];

    // When
    const res = await server.get(url);

    // Then
    expect(res.body).toEqual(
      expect.objectContaining({
        id,
        name,
        type,
        headcount,
        price,
        repairEndDate,
        isRepair,
      }),
    );
  });
});
