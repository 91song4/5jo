import { Test, TestingModule } from '@nestjs/testing';
import { number, string } from 'joi';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUserIdDto } from './dtos/find-user-id.dto';
import { FindUserPasswordDto } from './dtos/find-user-password.dto';
import { GetUserSelectDto } from './dtos/get-user-select.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { SendSMSDto } from './dtos/send-sms.dto';
import * as mocks from 'node-mocks-http';

describe('AuthController', () => {
  let authController: AuthController;

  const mockAuthService = {
    createUser: jest.fn(),
    getUserSelect: jest.fn(),
    findUserPassword: jest.fn(),
    sendSMS: jest.fn(),
    certification: jest.fn(),
    resetPassword: jest.fn(),
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

  describe('getUserSelect()', () => {
    it('탐색조건, 가져올 컬럼 선택해서 유저정보찾기', async () => {
      // Given
      const getUserSelectDto: GetUserSelectDto = {
        whereColumns: { id: 1 },
        selectColumns: ['userId', 'name'],
      };

      const getUserSelectReturnValue = {
        userId: 'admin',
        name: '최고 관리자',
      };

      mockAuthService.getUserSelect.mockResolvedValue(getUserSelectReturnValue);

      // When
      const expected = await authController.getUserSelect(getUserSelectDto);

      // Then
      // 성공 시 리턴값 일치
      expect(expected).toEqual(getUserSelectReturnValue);

      // service.getUserSelect 호출 횟수 1번이 맞는지
      expect(mockAuthService.getUserSelect).toHaveBeenCalledTimes(1);

      // service.getUserSelect 인수 전달 제대로 했는지
      expect(mockAuthService.getUserSelect).toHaveBeenCalledWith(
        getUserSelectDto.whereColumns,
        getUserSelectDto.selectColumns,
      );
    });
  });

  describe('isExist()', () => {
    it('정상작동', async () => {
      // Given
      const isExistParams = 'admin';

      const getUserSelectReturnValue = {
        userId: 'admin',
      };

      mockAuthService.getUserSelect.mockResolvedValue(getUserSelectReturnValue);

      // When
      const expected = await authController.isExist(isExistParams);

      // Then
      expect(expected).toEqual(getUserSelectReturnValue);
      expect(mockAuthService.getUserSelect).toHaveBeenCalledTimes(1);
      expect(mockAuthService.getUserSelect).toHaveBeenCalledWith(
        { userId: isExistParams },
        ['userId'],
      );
    });

    it('잘못된 id 전달', async () => {
      // Given
      const isExistParams = undefined;

      const getUserSelectReturnValue = null;

      mockAuthService.getUserSelect.mockResolvedValue(getUserSelectReturnValue);

      // When
      const expected = await authController.isExist(isExistParams);

      // Then
      expect(expected).toEqual(getUserSelectReturnValue);
      expect(mockAuthService.getUserSelect).toHaveBeenCalledTimes(1);
      expect(mockAuthService.getUserSelect).toHaveBeenCalledWith(
        { userId: isExistParams },
        ['userId'],
      );
    });
  });

  describe('findUserId()', () => {
    it('정상 작동', async () => {
      // Given
      const findUserIdDto: FindUserIdDto = {
        name: '송지훈',
        email: 'song4@gmail.com',
      };

      const getUserSelectReturnValue = {
        userId: expect.any(number),
      };

      mockAuthService.getUserSelect.mockResolvedValue(getUserSelectReturnValue);

      // When
      const expected = await authController.findUserId(findUserIdDto);

      // Then
      expect(expected).toEqual(getUserSelectReturnValue);
      expect(mockAuthService.getUserSelect).toHaveBeenCalledTimes(1);
      expect(mockAuthService.getUserSelect).toHaveBeenCalledWith(
        findUserIdDto,
        ['userId'],
      );
    });
  });

  describe('findUserPassword()', () => {
    it('비밀번호 찾기 페이지 정상작동 시', async () => {
      // Given
      const findUserPasswordDto: FindUserPasswordDto = {
        email: 'song4@gmail.com',
        phone: '010-2638-5808',
        userId: 'admin',
      };

      const findUserPasswordReturnValue = { userId: expect.any(string) };

      mockAuthService.findUserPassword.mockResolvedValue(
        findUserPasswordReturnValue,
      );
      // When
      const expected = await authController.findUserPassword(
        findUserPasswordDto,
      );
      // Then
      expect(expected).toEqual(findUserPasswordReturnValue);
      expect(mockAuthService.findUserPassword).toHaveBeenCalledTimes(1);
      expect(mockAuthService.findUserPassword).toHaveBeenCalledWith(
        findUserPasswordDto,
      );
    });
  });

  describe('sendSMS()', () => {
    it('정상작동', async () => {
      // Given
      const sendSMSDto: SendSMSDto = { phone: '010-2638-5808' };
      const sendSMSReturnValue = { message: '인증번호를 발송하였습니다.' };

      // When
      const expected = await authController.sendSMS(sendSMSDto);

      // Then
      expect(expected).toEqual(sendSMSReturnValue);
      expect(mockAuthService.sendSMS).toHaveBeenCalledTimes(1);
      expect(mockAuthService.sendSMS).toHaveBeenCalledWith(sendSMSDto.phone);
    });
  });

  describe('certification()', () => {
    it('정상작동', async () => {
      // Given
      const certificationDto = {
        param: 279521,
        body: { phone: '010-2638-5808' },
      };

      const certificationReturnValue = true;

      mockAuthService.certification.mockResolvedValue(certificationReturnValue);
      // When
      const expected = await authController.certification(
        certificationDto.param,
        certificationDto.body,
      );

      // Then
      expect(expected).toEqual(certificationReturnValue);
      expect(mockAuthService.certification).toHaveBeenCalledTimes(1);
      expect(mockAuthService.certification).toHaveBeenCalledWith({
        certificationNumber: certificationDto.param,
        phone: certificationDto.body.phone,
      });
    });
  });

  describe('resetPassword()', () => {
    it('in nomal operation', async () => {
      // Given
      const param = 'admin';
      const body: ResetPasswordDto = { password: '123213' };

      const resetPasswordReturnValue = { message: '비밀번호 재설정 완료' };
      mockAuthService.resetPassword.mockResolvedValue(resetPasswordReturnValue);

      // When
      const result = await authController.resetPassword(param, body);

      // Then
      expect(result).toEqual(resetPasswordReturnValue);
      expect(mockAuthService.resetPassword).toHaveBeenCalledTimes(1);
      expect(mockAuthService.resetPassword).toHaveBeenCalledWith(
        param,
        body.password,
      );
    });
  });

  describe('deleteRefreshToken()', () => {
    it('in nomal operation', async () => {
      // Given
      const req = mocks.createRequest();
      req.cookies = {
        accessToken: 'accesToken',
        refreshToken: 'refreshToken',
      };

      // When
      // Then
    });
  });

  describe('createUser()', () => {
    it('회원가입', async () => {
      // Given
      const createUserDto: CreateUserDto = {
        userId: 'song',
        password: '123',
        name: '송지훈',
        phone: '010-2638-5808',
        email: 'song4@gmail.com',
        birthday: new Date('1991-05-24'),
      };

      mockAuthService.createUser.mockResolvedValue({ id: expect.any(number) });

      // When
      const createUserReturnValue = await authController.createUser(
        createUserDto,
      );

      // Then
      // 성공 시 리턴값 일치하는지
      expect(createUserReturnValue).toEqual({
        id: expect.any(number),
      });

      // service.createUser 호출 횟수 1번이 맞는지
      expect(mockAuthService.createUser).toHaveBeenCalledTimes(1);

      // service.createUser 인수 전달 제대로 했는지
      expect(mockAuthService.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });

  afterEach(async () => {
    jest.clearAllMocks();
    // jest.resetAllMocks();
    // jest.restoreAllMocks();
  });
});
