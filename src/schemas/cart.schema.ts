import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
  @Prop({require: true, unique: true})
  productId: string;

  @Prop({required: true})
  productImage: string;

  @Prop({required: true})
  productName: string;

  @Prop({required: true})
  productCategory: string;

  @Prop({required: true})
  productDetails: string;

  @Prop({required: true})
  productQty: Number;

  @Prop({required: true})
  productTotalPrice: Number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);