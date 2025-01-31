import { Test, TestingModule } from '@nestjs/testing';
import { UserAddressService } from './user-address.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAddress, UserAddressDocument } from '../schemas/user-address.schema';

// ✅ Mock User Address Data
const mockUserAddress: UserAddress = {
  coordinates: '12.34, 56.78',
  houseNo: '101',
  landmark: 'Near Park',
  street: 'Main Street',
  city: 'Metropolis',
  state: 'NY',
  country: 'USA',
  pinCode: '10001',
};

// ✅ Mock Mongoose Model
const mockUserAddressModel = {
  create: jest.fn().mockResolvedValue(mockUserAddress), // Mock create
  save: jest.fn().mockResolvedValue(mockUserAddress), // Mock save
};

describe('UserAddressService', () => {
  let service: UserAddressService;
  let model: Model<UserAddressDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserAddressService,
        {
          provide: getModelToken(UserAddress.name),
          useValue: mockUserAddressModel,
        },
      ],
    }).compile();

    service = module.get<UserAddressService>(UserAddressService);
    model = module.get<Model<UserAddressDocument>>(getModelToken(UserAddress.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
