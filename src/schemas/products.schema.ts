import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({required: true, unique: true})
  id: string;

  @Prop({required: true})
  title: string;

  @Prop({required: true})
  price: number;

  @Prop({required: true})
  description: string;

  @Prop({required: true})
  category: string;

  @Prop({required: true})
  image: string;

  @Prop({default: false})
  isAddedToCart: boolean

  @Prop(raw({
    rate: {type: Number},
    count: {type: Number}
  }))
  rating: Record<string, any>
}

export const ProductSchema = SchemaFactory.createForClass(Product);