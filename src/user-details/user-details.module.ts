import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDetail, UserDetailSchema } from 'src/schemas/user-details.schema';
import { UserDetailService } from './user-details.service';

@Module({
  imports: [MongooseModule.forFeature([{name: UserDetail.name, schema: UserDetailSchema}])],
  providers: [UserDetailService],
  exports: [UserDetailService]
})
export class UserDetailsModule {}
