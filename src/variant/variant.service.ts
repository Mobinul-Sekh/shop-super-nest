
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Variant, VariantDocument } from 'src/schemas/variant.schema';
import { VariantDto } from './dtos/createVariant.dto';

@Injectable()
export class VariantService {
  constructor(
    @InjectModel(Variant.name) private variantModel: Model<Variant>
  ){}

  async createVariant(variantDto: Variant): Promise<Variant> {
    const createdVariant = new this.variantModel(variantDto);
    return createdVariant.id;
  }

  async createManyVariant(manyVariantDto: Variant[]): Promise<Variant[]> {
    const createdVariants = await this.variantModel.insertMany(manyVariantDto);
    return createdVariants;
  }  
}
