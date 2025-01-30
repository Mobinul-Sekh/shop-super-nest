import { Module } from '@nestjs/common';
import { UserCredentialService } from './user-credential.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCredential, UserCredentialSchema } from '../schemas/user-credentials.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: UserCredential.name, schema: UserCredentialSchema}])],
  providers: [UserCredentialService],
  exports: [UserCredentialService]
})
export class UserCredentialModule {}
