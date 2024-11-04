import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "./user.schema";

export type UserAddressDocument = HydratedDocument<UserAddress>;

@Schema()
export class UserAddress {
  @Prop({required: true, unique: true})
  id: string;
  
  @Prop()
  houseNo: string;

  @Prop()
  landmark: string;

  @Prop()
  street: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  country: string;

  @Prop()
  pinCode: string;
}

export const UserAddressSchema = SchemaFactory.createForClass(UserAddress);