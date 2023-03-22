import { Test, TestingModule } from '@nestjs/testing';
import { number } from 'joi';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';

describe('AuthController', () => {
  let authController: AuthController;
  // let authService: AuthService;

  const mockAuthService = {
    createUser: jest.fn(),
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
    // a uthService = module.get<AuthService>(AuthService);
  });

  describe('createUser()', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        userId: 'song',
        password: '123',
        name: '송지훈',
        phone: '010-2638-5808',
        email: 'song4@gmail.com',
        birthday: new Date('1991-05-24'),
      };

      mockAuthService.createUser = jest.fn((createUserDto: CreateUserDto) => {
        return { id: expect.any(number) };
      });

      const result = await authController.createUser(createUserDto);
      expect(result).toEqual({
        id: expect.any(number),
      });
    });
  });
});
