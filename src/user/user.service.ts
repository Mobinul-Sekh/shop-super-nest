import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { UserDTO } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async createUser(userDto: UserDTO): Promise<UserDocument> {
    const userExists = await this.findUserByEmail(userDto.phoneNo);
    if (userExists) {
      throw new BadRequestException('user already exists with this email id, please login!');
    }

    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }

  async findAllUsers(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findUserById(userId: string): Promise<UserDocument> {
    return await this.userModel.findOne({uid: userId}).exec();
  }

  async findUserByEmail(userEmail: string): Promise<UserDocument> {
    return await this.userModel.findOne({email: userEmail}).exec();
  }
}
