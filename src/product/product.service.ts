import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/products.schema';
import { ProductDto } from './dtos/create-product.dto';
import { VariantService } from 'src/variant/variant.service';
import { CategoryService } from 'src/category/category.service';
import { ProductDetailsService } from 'src/product-details/product-details.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly variantService: VariantService,
    private readonly categoryService: CategoryService,
    private readonly productDetailsService: ProductDetailsService
  ) {}

  async createProduct(productDto: ProductDto): Promise<Product> {
    const createdVariants = await this.variantService.createManyVariant(productDto.categoryData.variantsData);

    const createdCategory = await this.categoryService.createCategory({
      name: productDto.categoryData.name,
      type: productDto.categoryData.type,
      variants: createdVariants
    });

    const createdProductDetails = await this.productDetailsService.createProductDetails({
      productGSTPercent: productDto.productDetailsData.productGSTPercent,
      productGST: productDto.productDetailsData.productGST,
      desc: productDto.productDetailsData.desc,
      summary: productDto.productDetailsData.summary,
      features: productDto.productDetailsData.features
    })

    const createdProduct = new this.productModel({
      title: productDto.title,
      price: productDto.price,
      image: productDto.image,
      isAddedToCart: productDto.isAddedToCart,
      rating: productDto.rating,
      productDetails: createdProductDetails,
      category: createdCategory
    });
    createdProduct.save();

    return createdProduct.id;
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
      const productFound = await this.productModel.findOne({_id: productId}).exec();
      if (!productFound) {
        throw new BadRequestException(`no product found with id ${productId}`)
      }
      return productFound;
    } catch(err) {
      throw new err;
    }
  }
}
