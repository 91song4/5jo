import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { UsersModule } from 'src/users/users.module';
import supertest, { SuperTest } from 'supertest';
import { Repository } from 'typeorm';
import { UserDummy } from './dummy/user.dummy';

describe('User API TEST', () => {
  let app: INestApplication;
  let module: TestingModule;
  let server: SuperTest<supertest.Test>;
  let userRepository: Repository<User>;

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
        UsersModule,
      ],
    }).compile();

    app = module.createNestApplication();
    server = supertest(app.getHttpServer());
    userRepository = module.get(getRepositoryToken(User));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await userRepository.insert(UserDummy);
  });

  test('사용자 목록 조회', async () => {
    //GIVEN
    const url = '/users';
    const { id, userId, name, phone, email } = UserDummy[0];

    // WHEN
    const res = await server.get(url);

    // THEN
    expect(res.body[0].length).toEqual(UserDummy.length);
    expect(res.body[0][0]).toEqual(
      expect.objectContaining({ id, userId, name, phone, email }),
    );
  });
});
