import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAddress, UserAddressDocument } from '../schemas/user-address.schema';
import { UserAddressDTO } from './dtos/user-address.dto';

@Injectable()
export class UserAddressService {
  constructor(
    @InjectModel(UserAddress.name) private readonly userAddressModel: Model<UserAddress>
  ) {}

  async createUserAddress(userAddDto: UserAddressDTO): Promise<UserAddressDocument> {
    const createdUserAddress = new this.userAddressModel(userAddDto);
    return createdUserAddress.save();
  }
}
