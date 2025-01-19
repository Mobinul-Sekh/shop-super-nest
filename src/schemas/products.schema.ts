import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ProductDetails } from './product-details.schema';

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

  @Prop({ required: true })
  productDetailsId: string

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: ProductDetails
  })
  productDetails: ProductDetails
}

export const ProductSchema = SchemaFactory.createForClass(Product);