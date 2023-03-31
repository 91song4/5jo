import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request, { SuperTest } from 'supertest';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { UserDummy } from './dummy/user.dummy';
import { SmsModule } from 'src/sms/sms.module';
import { ConfigModule } from '@nestjs/config';
import * as mocks from 'node-mocks-http';
import { FindUserIdDto } from 'src/auth/dtos/find-user-id.dto';
import { string } from 'joi';
import { FindUserPasswordDto } from 'src/auth/dtos/find-user-password.dto';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let server: SuperTest<request.Test>;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: ':memory:',
          autoLoadEntities: true,
          synchronize: true,
          logging: false,
        }),
        AuthModule,
        SmsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    server = request(app.getHttpServer());
    userRepository = moduleFixture.get(getRepositoryToken(User));

    await userRepository.insert(UserDummy);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/auth/user GET', () => {
    it('where, select 선택해서 가져오기', async () => {
      // Given
      const url =
        `/auth/user?` +
        `whereColumns[id]=${UserDummy[0].id}&` +
        `selectColumns[]=name&` +
        `selectColumns[]=userId`;

      // When
      const res = await server.get(url);

      // Then
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        userId: UserDummy[0].userId,
        name: UserDummy[0].name,
      });
    });
  });

  describe('/auth/user/:userId GET', () => {
    it('아이디 체크', async () => {
      // Given
      const url = `/auth/user/${UserDummy[0].userId}`;

      // When
      const res = await server.get(url);

      // Then
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ userId: UserDummy[0].userId });
    });

    it('없는 아이디를 전달했을 때', async () => {
      // Given
      const url = `/auth/user/nonoid`;

      // When
      const res = await server.get(url);

      // Then
      expect(res.status).toBe(200);
      expect(res.body).toEqual({});
    });
  });

  describe('/auth/lost/id POST', () => {
    const url = '/auth/lost/id';
    it('아이디 찾기', async () => {
      // Given
      const findUserIdDto: FindUserIdDto = {
        name: UserDummy[0].name,
        email: UserDummy[0].email,
      };
      // When
      const res = await server.post(url).send(findUserIdDto);

      // Then
      expect(res.status).toBe(201);
      expect(res.body).toEqual({ userId: UserDummy[0].userId });
    });

    it('name이 없는 경우', async () => {
      // Given
      const findUserIdDto: FindUserIdDto = {
        name: 'name이 없는 경우',
        email: UserDummy[0].email,
      };

      // When
      const res = await server.post(url).send(findUserIdDto);

      // Then
      expect(res.status).toBe(201);
      expect(res.body).toEqual({});
    });
  });

  describe('/auth/lost/password POST', () => {
    it('비밀번호 찾기', async () => {
      // Given
      const url = '/auth/lost/password';
      const findUserPasswordDto: FindUserPasswordDto = {
        userId: UserDummy[1].userId,
        email: UserDummy[1].email,
        phone: UserDummy[1].phone,
      };

      // When
      const res = await server.post(url).send(findUserPasswordDto);

      // Then
      expect(res.status).toBe(201);
      expect(res.body).toEqual({ userId: UserDummy[1].userId });
    });
  });
});
