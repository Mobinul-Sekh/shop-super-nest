import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "./user.schema";
import { Product } from "./products.schema";

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
  @Prop({required: true, unique: true})
  id: string;

  @Prop({require: true})
  productId: string;

  @Prop({required: true})
  userId: string;

  @Prop({required: true})
  productQty: Number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User
  })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Product
  })
  product: Product
}

export const CartSchema = SchemaFactory.createForClass(Cart);