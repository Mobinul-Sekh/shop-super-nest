import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserStatusEnum } from '../schemas/user.schema';
import { BadRequestException } from '@nestjs/common';
import { UserPriorityEnum, UserRoleEnum } from 'src/auth/dtos/jwt-claim.dto';

// ✅ Mock User Data
const mockUser: User = {
  uid: '123',
  name: 'John Doe',
  status: UserStatusEnum.ACTIVE,
  role: UserRoleEnum.admin,
  priority: UserPriorityEnum.normal,
  detailsId: '53443',
  credentialId: '4324',
  cartId: '987',
  phoneNo: '9054352354',
};

// ✅ Mock Mongoose Model
const mockUserModel = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;
  let model: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      mockUserModel.findOne.mockResolvedValue(null); // Ensure user does not exist
      mockUserModel.create.mockReturnValue(mockUser);
      mockUserModel.save.mockResolvedValue(mockUser);

      const result = await service.createUser(mockUser);
      expect(result).toEqual(mockUser);
      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: mockUser.phoneNo });
      expect(mockUserModel.create).toHaveBeenCalledWith(mockUser);
    });

    it('should throw an error if user already exists', async () => {
      mockUserModel.findOne.mockResolvedValue(mockUser); // Simulate existing user

      await expect(service.createUser(mockUser)).rejects.toThrow(
        new BadRequestException('user already exists with this email id, please login!')
      );

      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: mockUser.phoneNo });
      expect(mockUserModel.create).not.toHaveBeenCalled();
    });
  });

  describe('findAllUsers', () => {
    it('should return a list of users', async () => {
      mockUserModel.find.mockResolvedValue([mockUser]);

      const result = await service.findAllUsers();
      expect(result).toEqual([mockUser]);
      expect(mockUserModel.find).toHaveBeenCalled();
    });
  });

  describe('findUserById', () => {
    it('should return a user by ID', async () => {
      mockUserModel.findOne.mockResolvedValue(mockUser);

      const result = await service.findUserById(mockUser.uid);
      expect(result).toEqual(mockUser);
      expect(mockUserModel.findOne).toHaveBeenCalledWith({ uid: mockUser.uid });
    });
  });

  describe('findUserByEmail', () => {
    it('should return a user by email', async () => {
      mockUserModel.findOne.mockResolvedValue(mockUser);

      const result = await service.findUserByEmail(mockUser.phoneNo);
      expect(result).toEqual(mockUser);
      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: mockUser.phoneNo });
    });
  });
});
