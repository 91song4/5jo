import { Test, TestingModule } from '@nestjs/testing';
import { number } from 'joi';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserSelectDto } from './dtos/get-user-select.dto';

describe('AuthController', () => {
  let authController: AuthController;

  const mockAuthService = {
    createUser: jest.fn(),
    getUserSelect: jest.fn(),
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

      // mockAuthService.getUserSelect = jest.fn(() => {
      //   return getUserSelectReturnValue;
      // });

      // jest
      //   .spyOn(mockAuthService, 'getUserSelect')
      //   .mockResolvedValue(getUserSelectReturnValue);

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

  describe('isExist', () => {
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

    // it('잘못된 id 전달', () => {});
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

      // mockAuthService.createUser = jest.fn((createUserDto: CreateUserDto) => {
      //   return { id: expect.any(number) };
      // });

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
