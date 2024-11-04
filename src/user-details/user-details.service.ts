import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDetail, UserDetailDocument } from 'src/schemas/user-details.schema';
import { UserDetailsDTO } from './dtos/user-details.dto';

@Injectable()
export class UserDetailService {
  constructor(
    @InjectModel(UserDetail.name) private readonly userDetailsModel: Model<UserDetail>
  ) {}

  async createUserAddress(userDetailDto: UserDetailsDTO): Promise<UserDetailDocument> {
    const createdUserDetails = new this.userDetailsModel(userDetailDto);
    return createdUserDetails.save();
  }
}