
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Variant, VariantDocument } from 'src/schemas/variant.schema';

@Injectable()
export class VariantService {
  constructor(
    @InjectModel(Variant.name) private variantModel: Model<Variant>
  ){}

  async createVariant(variantDto: VariantDocument): Promise<Variant> {
    const createdVariant = new this.variantModel(variantDto);
    return createdVariant.save();
  }
}
