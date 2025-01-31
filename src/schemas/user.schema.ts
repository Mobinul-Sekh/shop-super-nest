import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { UserPriorityEnum, UserRoleEnum } from "../auth/dtos/jwt-claim.dto";

export enum UserStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
  @Prop({required: true})
  uid: string;

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

  @Prop({required: true})
  detailsId: string;

  @Prop({ required: true })
  credentialId: string;

  //TODO: assign cart id when user adds products to the cart for the first time.
  @Prop()
  cartId: string
}

export const UserSchema = SchemaFactory.createForClass(User);