import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDetailDocument = HydratedDocument<UserDetail>

@Schema({ timestamps: true })
export class UserDetail {
  @Prop()
  email: string

  @Prop()
  isPhoneVerified: boolean

  @Prop()
  isEmailVerified: boolean
}

export const UserDetailSchema = SchemaFactory.createForClass(UserDetail);