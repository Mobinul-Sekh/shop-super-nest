import { Prop, Schema } from "@nestjs/mongoose";

export enum CategoryType {
  ClothingAndFashion = 'clothing and Fashion',
  Electronics = 'electronics',
  HealthAndBeauty = 'health and beauty',
  FoodAndBeverages = 'food and beverages',
}

@Schema()
export class Category {
  @Prop({required: true})
  id: string;

  @Prop({required: true})
  name: string;

  @Prop({required: true})
  type: CategoryType

  @Prop()
  variantsId: string;
}