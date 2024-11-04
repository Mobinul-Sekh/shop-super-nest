import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { UserAddress, UserAddressSchema } from 'src/schemas/user-address.schema';
import { UserDetail, UserDetailSchema } from 'src/schemas/user-details.schema';
import { UserCredential, UserCredentialSchema } from 'src/schemas/user-credentials.schema';
import { UserAddressService } from 'src/user-address/user-address.service';
import { UserDetailService } from 'src/user-details/user-details.service';
import { UserCredentialService } from 'src/user-credential/user-credential.service';
import { UserAddressModule } from 'src/user-address/user-address.module';
import { UserCredentialModule } from 'src/user-credential/user-credential.module';
import { UserDetailsModule } from 'src/user-details/user-details.module';

dotenv.config({ path: process.cwd() + '/.env.development' }); 

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserAddress.name, schema: UserAddressSchema},
      { name: UserDetail.name, schema: UserDetailSchema},
      { name: UserCredential.name, schema: UserCredentialSchema}
    ]),
    JwtModule.register({
      secret: process.env.TOKEN_SECRET,
      signOptions: { expiresIn: '1d'}
    }),
    UserModule,
    UserAddressModule,
    UserCredentialModule,
    UserDetailsModule
  ],
  providers: [AuthService, UserDetailService],
  controllers: [AuthController],
})
export class AuthModule {}
