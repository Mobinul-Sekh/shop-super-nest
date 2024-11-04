import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "./user.schema";

export type UserCredentialDocument = HydratedDocument<UserCredential>

@Schema()
export class UserCredential {
  @Prop({required: true, unique: true})
  id: string;
  
  @Prop()
  type: string

  @Prop()
  algo: string

  @Prop({required: true})
  digest: string

  @Prop()
  encrypted: string
}

export const UserCredentialSchema = SchemaFactory.createForClass(UserCredential);