import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request, { agent } from 'supertest';
import { AppModule } from './../src/app.module';
import cookieParser from 'cookie-parser';

describe('CampController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });
  describe('End-to-End Test', () => {
    test('/log-in (POST)', async () => {
      const res = await request(app.getHttpServer()).post('/auth/log-in').send({
        userId: 'admin',
        password: process.env.ADMIN_PASSWORD,
      });
      expect(res.status).toBe(201);
    });
    test('/camps (GET)', async () => {
      await request(app.getHttpServer())
        .get('/camps')
        .set('Cookie', [
          'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE2Nzk2NDUxMTYsImV4cCI6MTY3OTY0ODcxNn0.nm6-CWWbCiT7KRLLHGt0lPjzbf_zWDIolKMZBpRIUSM',
          'refreshToken=$2b$10$NJ8Z7cgr1C..nDOFAgjV2.9rxpa/VZCud.5n8t0XKWltBN7s4Jnty',
        ])
        .expect(200);
    });
    test('/camps/:id (GET)', async () => {
      await request(app.getHttpServer())
        .get('/camps/1')
        .set('Cookie', [
          'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE2Nzk2NDUxMTYsImV4cCI6MTY3OTY0ODcxNn0.nm6-CWWbCiT7KRLLHGt0lPjzbf_zWDIolKMZBpRIUSM',
          'refreshToken=$2b$10$NJ8Z7cgr1C..nDOFAgjV2.9rxpa/VZCud.5n8t0XKWltBN7s4Jnty',
        ])
        .expect(200);
    });
    test('/camps (POST)', async () => {
      await agent(app.getHttpServer())
        .post('/camps')
        .send({ name: 'AAA', type: 4, headcount: 16, price: 500000 })
        .set('Cookie', [
          'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE2Nzk2NDUxMTYsImV4cCI6MTY3OTY0ODcxNn0.nm6-CWWbCiT7KRLLHGt0lPjzbf_zWDIolKMZBpRIUSM',
          'refreshToken=$2b$10$NJ8Z7cgr1C..nDOFAgjV2.9rxpa/VZCud.5n8t0XKWltBN7s4Jnty',
        ])
        .expect(201);
    });
    test('/camps/:id (PUT)', async () => {
      await agent(app.getHttpServer())
        .put('/camps/5')
        .send({
          name: 'BBB',
          type: 5,
          headcount: 20,
          price: 88888888,
          isRepair: true,
          repairEndDate: '2023-03-24',
        })
        .set('Cookie', [
          'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE2Nzk2NDUxMTYsImV4cCI6MTY3OTY0ODcxNn0.nm6-CWWbCiT7KRLLHGt0lPjzbf_zWDIolKMZBpRIUSM',
          'refreshToken=$2b$10$NJ8Z7cgr1C..nDOFAgjV2.9rxpa/VZCud.5n8t0XKWltBN7s4Jnty',
        ])
        .expect(200);
    });
    test('/camps:id (DELETE)', async () => {
      await agent(app.getHttpServer())
        .delete('/camps/5')
        .set('Cookie', [
          'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE2Nzk2NDUxMTYsImV4cCI6MTY3OTY0ODcxNn0.nm6-CWWbCiT7KRLLHGt0lPjzbf_zWDIolKMZBpRIUSM',
          'refreshToken=$2b$10$NJ8Z7cgr1C..nDOFAgjV2.9rxpa/VZCud.5n8t0XKWltBN7s4Jnty',
        ])
        .expect(200);
    });
  });
  afterAll(() => {
    app.close;
  });
});
