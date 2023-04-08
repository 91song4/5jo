import { Test, TestingModule } from '@nestjs/testing';
import { date, number, string } from 'joi';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUserIdDto } from './dtos/find-user-id.dto';
import { FindUserPasswordDto } from './dtos/find-user-password.dto';
import { GetUserSelectDto } from './dtos/get-user-select.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { SendSMSDto } from './dtos/send-sms.dto';
import * as mocks from 'node-mocks-http';
import { SmsModule } from 'src/sms/sms.module';
import { ConfigModule } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

// 전체적인 바구니describe
describe('AuthController', () => {
  // 어떤것을 테스트해줄 것인지 적어줌
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    createUser: jest.fn(),
    getUserSelect: jest.fn(),
    findUserPassword: jest.fn(),
    sendSMS: jest.fn(),
    certification: jest.fn(),
    resetPassword: jest.fn(),
    deleteRefreshToken: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  // 테스트가 끝나고 한번 실행
  afterEach(async () => {
    jest.clearAllMocks();
  });

  describe('회원가입', () => {
    it('dto 데이터가 service로 잘 넘어가는지', async () => {
      // Given
      const createUserDto: CreateUserDto = {
        userId: 'test-userId',
        password: '123',
        name: 'test-name',
        phone: '010-1234-1234',
        email: 'test@test.com',
        birthday: new Date(),
      };

      // When
      const res = await authController.createUser(createUserDto);

      // Then
      expect(authService.createUser).toHaveBeenCalledTimes(1);
      expect(authService.createUser).toHaveBeenCalledWith(createUserDto);
    });

    it('service.createUser의 return값이 controller.createUser의 return값과 일치하는지', async () => {
      // Given
      const createUserDto: CreateUserDto = {
        userId: 'test-userId',
        password: '123',
        name: 'test-name',
        phone: '010-1234-1234',
        email: 'test@test.com',
        birthday: new Date(),
      };
      const authServiceReturnValue = { id: expect.any(number) };
      mockAuthService.createUser.mockReturnValue(authServiceReturnValue);

      // When
      const res = await authController.createUser(createUserDto);
      // Then
      expect(res).toEqual(mockAuthService.createUser(createUserDto));
    });
  });
});
