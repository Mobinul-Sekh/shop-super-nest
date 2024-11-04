import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { UserDetail } from "./user-details.schema";
import { UserCredential } from "./user-credentials.schema";
import { UserPriorityEnum, UserRoleEnum } from "src/auth/dtos/jwt-claim.dto";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  @Prop({required: true})
  uid: string;

  @Prop({required: true})
  name: string

  @Prop({required: true})
  email: string

  @Prop({required: true})
  isActive: boolean

  @Prop({required: true})
  role: UserRoleEnum

  @Prop({required: true})
  priority: UserPriorityEnum

  @Prop({required: true})
  detailsId: string;

  @Prop({ required: true })
  credentialId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);