import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/schemas/products.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  async createProduct(productDto: ProductDocument): Promise<Product> {
    const createdProduct = new this.productModel(productDto);
    return createdProduct.save();
  }

  async findAllProducts(): Promise<ProductDocument[]> {
    try {
      return await this.productModel.find().exec()
    } catch(err) {
      throw new err;
    }
  }

  async findByProductId(productId: string): Promise<ProductDocument> {
    try {
      const productFound = await this.productModel.findOne({id: productId}).exec();
      if (!productFound) {
        throw new BadRequestException(`no product found with id ${productId}`)
      }
      return productFound;
    } catch(err) {
      throw new err;
    }
  }
}
