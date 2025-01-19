import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export enum VariantTypeEnum {
  COLOR = 'color',
  SIZE = 'size'
}

export type VariantDocument = HydratedDocument<Variant>;

@Schema()
export class Variant {
  @Prop({required: true, unique: true})
  id: string;

  @Prop({required: true})
  name: string;

  @Prop({
    required: true,
    enum: VariantTypeEnum
  })
  type: VariantTypeEnum

  @Prop({required: true})
  typeOptions: string[]
}

export const variantSchema = SchemaFactory.createForClass(Variant);