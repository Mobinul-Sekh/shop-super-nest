import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCredential, UserCredentialDocument } from 'src/schemas/user-credentials.schema';
import { UserCredentialDTO } from './dtos/user-credential.dto';

@Injectable()
export class UserCredentialService {
  constructor(
    @InjectModel(UserCredential.name) private readonly userCredentialModel: Model<UserCredential>
  ) {}

  async createUserCredential(userCredentialDto: UserCredentialDTO): Promise<UserCredentialDocument> {
    const createdUserCredential = new this.userCredentialModel(userCredentialDto);
    return createdUserCredential.save();
  }

  async findCredentialById(credentialId: string): Promise<UserCredentialDocument> {
    return this.userCredentialModel.findOne({ id: credentialId }).exec();
  }
}
