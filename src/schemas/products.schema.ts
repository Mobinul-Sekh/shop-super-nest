import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop()
  image: string;

  @Prop(raw({
    rate: {type: Number},
    count: {type: Number}
  }))
  rating: Record<string, any>
}

export const ProductSchema = SchemaFactory.createForClass(Product);