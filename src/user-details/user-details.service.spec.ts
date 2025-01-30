import { Test, TestingModule } from '@nestjs/testing';
import { UserDetailService } from './user-details.service';

describe('UserDetailsService', () => {
  let service: UserDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserDetailService],
    }).compile();

    service = module.get<UserDetailService>(UserDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
