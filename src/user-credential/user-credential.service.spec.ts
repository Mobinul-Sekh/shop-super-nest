import { Test, TestingModule } from '@nestjs/testing';
import { UserCredentialService } from './user-credential.service';
import { UserCredential, UserCredentialDocument } from '../schemas/user-credentials.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

const mockUserCredential: UserCredential = {
  id: '123',
  type: '',
  algo: 'SHA256',
  digest: '9584rio34',
  encrypted: '4t89urio9fj'
}

describe('UserCredentialService', () => {
  let service: UserCredentialService;
  let model: Model<UserCredentialDocument>;

  beforeEach(async () => {
    const mockUserCredentialModel = {
      create: jest.fn().mockImplementation((dto) => ({
        ...dto,
        save: jest.fn().mockResolvedValue(dto), // ✅ Mock `.save()`
      })),
      findOne: jest.fn().mockResolvedValue(mockUserCredential),
      find: jest.fn().mockResolvedValue([mockUserCredential]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserCredentialService,
        {
          provide: getModelToken(UserCredential.name),
          useValue: mockUserCredentialModel
        }
      ],
    }).compile();

    service = module.get<UserCredentialService>(UserCredentialService);
    model = module.get<Model<UserCredentialDocument>>(getModelToken(UserCredential.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user credential', async () => {
    const result = await service.createUserCredential(mockUserCredential as UserCredentialDocument);
    expect(result).toEqual(mockUserCredential);
  });

  it('should find user credential by id', async () => {
    const result = await service.findCredentialById(mockUserCredential.id);
    expect(result).toEqual(mockUserCredential);
  })
});
