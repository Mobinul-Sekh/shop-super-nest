import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAddress, UserAddressSchema } from '../schemas/user-address.schema';
import { UserAddressService } from './user-address.service';

@Module({
  imports: [MongooseModule.forFeature([{name: UserAddress.name, schema: UserAddressSchema}])],
  providers: [UserAddressService],
  exports: [UserAddressService]
})
export class UserAddressModule {}
