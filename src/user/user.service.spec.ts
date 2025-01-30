import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User, UserDocument, UserStatusEnum } from 'src/schemas/user.schema';
import { UserPriorityEnum, UserRoleEnum } from 'src/auth/dtos/jwt-claim.dto';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

const mockUser: User = {
  uid: '123',
  name: 'Mobinul',
  status: UserStatusEnum.ACTIVE,
  role: UserRoleEnum.admin,
  priority: UserPriorityEnum.normal,
  detailsId: '53443',
  credentialId: '4324',
  cartId: '987',
  phoneNo: '9054352354',
};

describe('UserService', () => {
  let service: UserService;
  let model: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name), // ✅ Inject the User model properly
          useValue: {
            create: jest.fn().mockResolvedValue(mockUser), // ✅ Mock create method
            findOne: jest.fn().mockResolvedValue(mockUser), // ✅ Mock findOne method
            findById: jest.fn().mockResolvedValue(mockUser), // ✅ Mock findById method
            save: jest.fn().mockResolvedValue(mockUser), // ✅ Mock save method
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const result = await service.createUser(mockUser); // Assuming createUser exists in UserService
    expect(result).toEqual(mockUser);
  });

  it('should find a user by id', async () => {
    const result = await service.findUserById(mockUser.uid); // Assuming findUserById exists in UserService
    expect(result).toEqual(mockUser);
  });
});
