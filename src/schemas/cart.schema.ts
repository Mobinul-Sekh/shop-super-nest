import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "./user.schema";
import { Product } from "./products.schema";

export type CartDocument = HydratedDocument<Cart>;

@Schema({ timestamps: true })
export class Cart {
  @Prop({require: true})
  productId: string;

  @Prop({required: true})
  userId: string;

  @Prop({required: true})
  productQty: Number;

  @Prop({
    type: () => User
  })
  user: User;

  @Prop({
    type: () => Product,
  })
  product: Product
}

export const CartSchema = SchemaFactory.createForClass(Cart);