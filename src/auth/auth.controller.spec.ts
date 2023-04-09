import { Test, TestingModule } from '@nestjs/testing';
import { array, date, number, string } from 'joi';
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
      expect(mockAuthService.createUser).toHaveBeenCalledTimes(1);
      expect(mockAuthService.createUser).toHaveBeenCalledWith(createUserDto);
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

  describe('where, select 선택해서 유저 정보 가져오기', () => {
    it('dto -> service로 잘 전달 되는지', async () => {
      // Given
      const getUserSelectDto: GetUserSelectDto = {
        whereColumns: {
          id: expect.any(number),
          userId: expect.any(string),
          name: expect.any(string),
        },
        selectColumns: expect.any(array<string>),
      };

      // When
      await authController.getUserSelect(getUserSelectDto);

      // Then
      expect(mockAuthService.getUserSelect).toHaveBeenCalledTimes(1);
      expect(mockAuthService.getUserSelect).toHaveBeenCalledWith(
        getUserSelectDto.whereColumns,
        getUserSelectDto.selectColumns,
      );
    });

    it('controller.getUserSelect와 service.getUserSelect의 return 값이 같은지', async () => {
      // Given
      const getUserSelectDto: GetUserSelectDto = {
        whereColumns: {
          id: expect.any(number),
          userId: expect.any(string),
          name: expect.any(string),
        },
        selectColumns: ['userId', 'name'],
      };

      const authServiceReturnValue = {
        userId: expect.any(string),
        name: expect.any(string),
      };

      mockAuthService.getUserSelect.mockReturnValue(authServiceReturnValue);

      // When
      const res = await authController.getUserSelect(getUserSelectDto);

      // Then
      expect(res).toEqual(
        mockAuthService.getUserSelect(
          getUserSelectDto.whereColumns,
          getUserSelectDto.selectColumns,
        ),
      );
    });
  });

  describe('비밀번호 찾기', () => {
    it('dto -> service 제대로 전달 되는지', async () => {
      // Given
      const findUserPasswordDto: FindUserPasswordDto = {
        userId: 'test-userId',
        email: 'test@email.com',
        phone: '010-1133-1133',
      };

      // When
      await authController.findUserPassword(findUserPasswordDto);

      // Then
      expect(mockAuthService.findUserPassword).toHaveBeenCalledTimes(1);
      expect(mockAuthService.findUserPassword).toHaveBeenCalledWith(
        findUserPasswordDto,
      );
    });

    it('controller.findUserPassword와 service.getUserSelect의 return 값이 같은지', async () => {
      // Given
      const findUserPasswordDto: FindUserPasswordDto = {
        userId: 'test-userId',
        email: 'test@email.com',
        phone: '010-1133-1133',
      };

      const findUserPasswordReturnValue = { userId: expect.any(string) };

      mockAuthService.findUserPassword.mockResolvedValue(
        findUserPasswordReturnValue,
      );

      // When
      const res = authController.findUserPassword(findUserPasswordDto);

      // Then
      expect(res).toEqual(
        mockAuthService.findUserPassword(findUserPasswordDto),
      );
    });
  });

  describe('비밀번호 찾기 - 휴대폰 인증', () => {
    it('dto -> service 제대로 전달 되는지', async () => {
      // Given
      const sendSMSDto: SendSMSDto = { phone: '010-1234-1234' };

      // When
      await authController.sendSMS(sendSMSDto);

      // Then
      expect(mockAuthService.sendSMS).toHaveBeenCalledTimes(1);
      expect(mockAuthService.sendSMS).toHaveBeenCalledWith(sendSMSDto.phone);
    });

    it('제대로 return을 뱉는지', async () => {
      // Given
      const sendSMSDto: SendSMSDto = { phone: '010-1234-1234' };

      // When
      const res = await authController.sendSMS(sendSMSDto);

      // Then
      expect(res).toEqual({ message: '인증번호를 발송하였습니다.' });
    });
  });
});
