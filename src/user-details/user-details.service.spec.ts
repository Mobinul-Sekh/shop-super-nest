import { Test, TestingModule } from '@nestjs/testing';
import { UserDetailService } from './user-details.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDetail, UserDetailDocument } from '../schemas/user-details.schema';
import { UserDetailsDTO } from './dtos/user-details.dto';

// ✅ Mock User Details Data
const mockUserDetailDto: UserDetailsDTO = {
  email: 'test@example.com',
  isPhoneVerified: true,
  isEmailVerified: false,
};

describe('UserDetailService', () => {
  let service: UserDetailService;
  let model: Model<UserDetailDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserDetailService,
        {
          provide: getModelToken(UserDetail.name),
          useValue: {
            create: jest.fn().mockImplementation((dto) => Promise.resolve(dto)), // ✅ Mock create method
            save: jest.fn().mockImplementation((dto) => Promise.resolve(dto)), // ✅ Mock save method
          },
        },
      ],
    }).compile();

    service = module.get<UserDetailService>(UserDetailService);
    model = module.get<Model<UserDetailDocument>>(getModelToken(UserDetail.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUserDetails', () => {
    it('should create user details successfully', async () => {
      const result = await service.createUserDetails(mockUserDetailDto);
      expect(result).toEqual(mockUserDetailDto);
    });

    it('should throw an error if creation fails', async () => {
      jest.spyOn(model, 'create').mockRejectedValue(new Error('Database error'));

      await expect(service.createUserDetails(mockUserDetailDto)).rejects.toThrow('Database error');
    });
  });
});
