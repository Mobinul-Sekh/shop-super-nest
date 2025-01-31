import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ProductDetails } from './product-details.schema';
import { Category } from './category.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  image: string;

  @Prop({ default: false })
  isAddedToCart: boolean;

  @Prop(
    raw({
      rate: { type: Number },
      count: { type: Number },
    }),
  )
  rating: {
    rate: number;
    count: number;
  };

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductDetails', // Reference to the ProductDetails model
    required: true,
  })
  productDetails: ProductDetails;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Reference to the Category model
    required: true,
  })
  category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
