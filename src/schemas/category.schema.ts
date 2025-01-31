import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Variant } from './variant.schema';
import mongoose, { HydratedDocument } from 'mongoose';

export enum CategoryTypeEnum {
  ClothingAndFashion = 'clothing and Fashion',
  Electronics = 'electronics',
  HealthAndBeauty = 'health and beauty',
  FoodAndBeverages = 'food and beverages',
}

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    enum: CategoryTypeEnum,
  })
  type: CategoryTypeEnum;

  @Prop({
    required: true,
    type: [mongoose.Schema.Types.ObjectId], // Array of ObjectIds for variants
    ref: 'Variant', // Reference to Variant model
  })
  variants: Variant[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
