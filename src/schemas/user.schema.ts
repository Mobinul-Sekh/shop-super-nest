import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { UserPriorityEnum, UserRoleEnum } from "../auth/dtos/jwt-claim.dto";
import { UserDetail } from "./user-details.schema";
import { UserCredential } from "./user-credentials.schema";
import { UserAddress } from "./user-address.schema";

export enum UserStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
  @Prop({required: true})
  name: string

  @Prop({required: true})
  phoneNo: string

  @Prop({
    required: true, 
    enum: UserStatusEnum, 
    default: UserStatusEnum.ACTIVE
  })
  status: UserStatusEnum

  @Prop({
    required: true,
    enum: UserRoleEnum,
  })
  role: UserRoleEnum

  @Prop({
    required: true,
    enum: UserPriorityEnum,
    default: UserPriorityEnum.normal
  })
  priority: UserPriorityEnum

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetail',
    required: true,
  })
  details: UserDetail;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserCredential',
    required: true,
  })
  credentials: UserCredential;

  @Prop({
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'UserAddress',
  })
  addresses: UserAddress;

  //TODO: assign cart id when user adds products to the cart for the first time.
  @Prop()
  cartId: string
}

export const UserSchema = SchemaFactory.createForClass(User);