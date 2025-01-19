import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDetailDocument = HydratedDocument<UserDetail>

@Schema()
export class UserDetail {
  @Prop({required: true, unique: true})
  id: string;

  @Prop()
  email: string

  @Prop()
  isPhoneVerified: boolean

  @Prop()
  isEmailVerified: boolean

  @Prop({ required: true, type: [String], default: [] })
  addressIds: string[];
}

export const UserDetailSchema = SchemaFactory.createForClass(UserDetail);