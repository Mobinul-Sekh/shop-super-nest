import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignupDTO } from './dtos/signup.dto';
import { LoginDTO } from './dtos/login.dto';

// ✅ Mock AuthService
const mockAuthService = {
  userSignup: jest.fn(),
  userLogin: jest.fn(),
};

// ✅ Mock DTO Data
const mockSignupDto: SignupDTO = {
  email: 'test@example.com',
  password: 'password123',
  name: 'John Doe',
  confirmPassword: '1234567890',
};

const mockLoginDto: LoginDTO = {
  email: 'test@example.com',
  password: 'password123',
};

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService, // ✅ Inject mock service
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signup', () => {
    it('should successfully sign up a user', async () => {
      mockAuthService.userSignup.mockResolvedValue('mocked_token');

      const result = await controller.signup(mockSignupDto);
      expect(result).toEqual({
        success: true,
        message: 'signup successful',
        token: 'mocked_token',
      });

      expect(mockAuthService.userSignup).toHaveBeenCalledWith(mockSignupDto);
    });

    it('should return an error if signup fails', async () => {
      const error = new Error('Signup failed');
      mockAuthService.userSignup.mockRejectedValue(error);

      await expect(controller.signup(mockSignupDto)).rejects.toThrow(error);
      expect(mockAuthService.userSignup).toHaveBeenCalledWith(mockSignupDto);
    });
  });

  describe('login', () => {
    it('should successfully log in a user', async () => {
      mockAuthService.userLogin.mockResolvedValue('mocked_token');

      const result = await controller.login(mockLoginDto);
      expect(result).toEqual({
        success: true,
        message: 'login successful',
        token: 'mocked_token',
      });

      expect(mockAuthService.userLogin).toHaveBeenCalledWith(mockLoginDto);
    });

    it('should return an error if login fails', async () => {
      const error = new Error('Login failed');
      mockAuthService.userLogin.mockRejectedValue(error);

      await expect(controller.login(mockLoginDto)).rejects.toThrow(error);
      expect(mockAuthService.userLogin).toHaveBeenCalledWith(mockLoginDto);
    });
  });
});
