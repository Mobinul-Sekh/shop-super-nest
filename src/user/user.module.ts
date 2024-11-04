import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserCredential, UserCredentialSchema } from 'src/schemas/user-credentials.schema';
import { UserDetail, UserDetailSchema } from 'src/schemas/user-details.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: User.name, schema: UserSchema}
  ])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}