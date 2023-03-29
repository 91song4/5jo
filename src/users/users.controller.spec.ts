import { Query } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { number } from 'joi';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

// 바구니 묶어 주는 애
describe('UsersController', () => {
  // 어떤걸 테스트할 것인지 적어줌.
  let controller: UsersController;

  // mockUsersService 내가 이안에서 가짜로 서비스를 만들겠다.
  let mockUsersService = {
    createUsersInformation: jest.fn(),
    getUsersInformation: jest.fn(),
    getUsersInformationById: jest.fn(),
    updateUsersInformation: jest.fn(),
    deleteUsersInformation: jest.fn(),
  };

  // 묶어주는애
  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });

  // beforeAll은 테스트가 실행하기 전에 한번만 실행함(전체적용)

  // 테스트 모듈을 설정해주는것
  // 테스트가 실행하기 전에 항상 실행하는 친구
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      // UsersService를 내가 내 입맛에 맞게 작업할거야 선언하는것
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  // 제일 큰 바구니 안에 또 다른 바구니가 들어가 있는것
  describe('createUsersInformation()', () => {
    it('유저정보 생성 API 정상작동 시', () => {
      // Given
      mockUsersService.createUsersInformation.mockReturnValue('hehe');
      // When
      const date = new Date();

      controller.createUsersInformation({
        name: 'testname',
        userId: 'testId',
        phone: 'testphone',
        email: 'testmail',
        birthday: date,
        password: 'testpassword',
      });

      // Then
      // 성공시 리턴값 일치
      expect(mockUsersService.createUsersInformation()).toEqual('hehe');
      expect(mockUsersService.createUsersInformation).toHaveBeenCalledTimes(1);
      expect(mockUsersService.createUsersInformation).toHaveBeenCalledWith(
        'testname',
        'testId',
        'testphone',
        'testmail',
        date,
        'testpassword',
      );
    });
  });

  // describe 바구니 묶어주는애
  describe('getUsersInformation()', () => {
    it('유저 정보 조회 API 정상 작동 시', async () => {
      // Given
      mockUsersService.getUsersInformation.mockReturnValue('bebe');

      // When
      const expected = await controller.getUsersInformation({ page: 0 });

      // Then
      expect(expected).toEqual('bebe');

      // toHaveBeenCalledTimes(호출횟수) 테스트를 실행할때 몇 번 불리기를 원하는가? 적어주는것.
      expect(mockUsersService.getUsersInformation).toHaveBeenCalledTimes(1);

      // toHaveBeenCalledWith 인자를 뭘로 전달했느냐?
      expect(mockUsersService.getUsersInformation).toHaveBeenCalledWith(0);
    });
  });

  // describe 바구니 묶어주는애
  describe('getUsersInformationById()', () => {
    it('유저 정보 상세조회 API 정상 작동 시', async () => {
      // Given
      mockUsersService.getUsersInformationById.mockReturnValue('heehee');

      // When
      const expected = await controller.getUsersInformationById(0);

      // Then
      expect(expected).toEqual('heehee');

      // toHaveBeenCalledTimes(호출횟수) 테스트를 실행할때 몇 번 부르겠느냐?
      expect(mockUsersService.getUsersInformationById).toHaveBeenCalledTimes(1);

      // toHaveBeenCalledWith 인자를 뭘로 전달했느냐?
      expect(mockUsersService.getUsersInformationById).toHaveBeenLastCalledWith(
        0,
      );
    });
  });

  describe('updateUsersInformation()', () => {
    it('유저 정보 수정 API 정상 작동 시', async () => {
      // Given
      mockUsersService.updateUsersInformation.mockReturnValue('yun');
      // When
      const expected = await controller.updateUsersInformation(3, {
        name: 'name',
        email: 'email',
        password: 'password',
        phone: 'phone',
      });
      // Then
      expect(expected).toEqual('yun');

      // toHaveBeenCalledTimes(호출횟수) 테스트를 실행할때 몇 번 부르겠느냐?
      expect(mockUsersService.updateUsersInformation).toHaveBeenCalledTimes(1);

      // toHaveBeenCalledWith 인자를 뭘로 전달했느냐?
      expect(mockUsersService.updateUsersInformation).toHaveBeenLastCalledWith(
        3,
        {
          name: 'name',
          email: 'email',
          password: 'password',
          phone: 'phone',
        },
      );
    });
  });

  describe('deleteUsersInformation', () => {
    it('유저 정보 삭제 API 정상 작동 시', async () => {
      // Given
      mockUsersService.deleteUsersInformation.mockReturnValue('kiki');

      // When
      const expected = await controller.deleteUsersInformation(2);
      // Then
      expect(expected).toEqual('kiki');

      // toHaveBeenCalledTimes(호출횟수) 테스트를 실행할때 몇 번 부르겠느냐?
      expect(mockUsersService.deleteUsersInformation).toHaveBeenCalledTimes(1);

      // toHaveBeenCalledWith 인자를 뭘로 전달했느냐?
      expect(mockUsersService.deleteUsersInformation).toHaveBeenLastCalledWith(
        2,
      );
    });
  });
});

// 테스트 코드 작성요령
// describe 바구니 묶어주는애
// describe('함수명', () => {
//   it('세부설명', async () => {
// Given
// 함수안의 인자를 전달 받는것을 정의해준다. why? when에서 쓰기 위해서

// When
// 하고 싶은 테스트를 적음.
// 내가 이거를 테스트 할거야.

// Then
// 테스트 진행
//   })
// })
