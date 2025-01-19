import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductDetailsDocument = HydratedDocument<ProductDetails>

@Schema()
export class ProductDetails {
  @Prop({required: true, unique: true})
  id: string;

  @Prop()
  productGSTPercent: Number;

  @Prop()
  productGST: Number;

  @Prop({required: true})
  desc: string;

  @Prop()
  summary: string;

  @Prop()
  features: string
}

export const ProductDetailsSchema = SchemaFactory.createForClass(ProductDetails);