import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductDetailsDocument = HydratedDocument<ProductDetails>

@Schema({ timestamps: true })
export class ProductDetails {
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