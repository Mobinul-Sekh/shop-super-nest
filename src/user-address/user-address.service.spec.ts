import { Test, TestingModule } from '@nestjs/testing';
import { UserAddressService } from './user-address.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAddress, UserAddressDocument } from '../schemas/user-address.schema';

const mockUserAddress = {
  id: '123',
  coordinates: '12.34, 56.78',
  houseNo: '101',
  landmark: 'Near Park',
  street: 'Main Street',
  city: 'Metropolis',
  state: 'NY',
  country: 'USA',
  pinCode: '10001',
};

describe('UserAddressService', () => {
  let service: UserAddressService;
  let model: Model<UserAddressDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserAddressService,
        {
          provide: getModelToken(UserAddress.name), // ✅ Provide the model token
          useValue: {
            create: jest.fn().mockResolvedValue(mockUserAddress), // Mock create method
            find: jest.fn().mockResolvedValue([mockUserAddress]), // Mock find method
            findById: jest.fn().mockResolvedValue(mockUserAddress), // Mock findById method
            save: jest.fn().mockResolvedValue(mockUserAddress), // Mock save method
          },
        },
      ],
    }).compile();

    service = module.get<UserAddressService>(UserAddressService);
    model = module.get<Model<UserAddressDocument>>(getModelToken(UserAddress.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user address', async () => {
    const result = await service.createUserAddress(mockUserAddress);
    expect(result).toEqual(mockUserAddress);
  });
});
