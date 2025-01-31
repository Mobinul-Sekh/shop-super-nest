import { Test, TestingModule } from '@nestjs/testing';
import { UserAddressService } from './user-address.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAddress, UserAddressDocument } from '../schemas/user-address.schema';

// ✅ Mock User Address Data
const mockUserAddress: UserAddress = {
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

  describe('createUserAddress', () => {
    it('should create a user address successfully', async () => {
      const result = await service.createUserAddress(mockUserAddress);
      expect(result).toEqual(mockUserAddress);
      expect(mockUserAddressModel.create).toHaveBeenCalledWith(mockUserAddress);
    });

    it('should throw an error if creation fails', async () => {
      jest.spyOn(model, 'create').mockRejectedValue(new Error('Creation failed'));
      await expect(service.createUserAddress(mockUserAddress)).rejects.toThrow('Creation failed');
    });
  });
});
