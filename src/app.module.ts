import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserDetailService } from './user-details/user-details.service';
import { UserAddressService } from './user-address/user-address.service';
import { UserAddressModule } from './user-address/user-address.module';
import { UserDetailsModule } from './user-details/user-details.module';
import { UserCredentialModule } from './user-credential/user-credential.module';
import * as dotenv from 'dotenv';
import { UserCredentialService } from './user-credential/user-credential.service';

dotenv.config({ path: process.cwd() + '/.env.development' });

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_STRING), ProductModule, CartModule, AuthModule, UserModule, UserAddressModule, UserDetailsModule, UserCredentialModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
