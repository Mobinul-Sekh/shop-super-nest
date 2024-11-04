import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from 'src/schemas/cart.schema';
import { ProductService } from 'src/product/product.service';
import { ProductDocument } from 'src/schemas/products.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,

    private readonly productService: ProductService
  ) {}

  async addProductToCart(cartDto: CartDocument): Promise<CartDocument> {
    const productExists = await this.findByProductId(cartDto.productId);
    if (productExists) {
      throw new BadRequestException("product already exists in cart!");
    }

    const prodResponse = await this.productService.findByProductId(cartDto.productId);
    if (!prodResponse) {
      throw new NotFoundException('product not found');
    }
    prodResponse.isAddedToCart = true;
    await this.productService.createProduct(prodResponse as ProductDocument);

    const createdCartProduct = new this.cartModel(cartDto);
    return await createdCartProduct.save();
  }

  async findAllProductsInCart(): Promise<CartDocument[]> {
    return await this.cartModel.find().exec()
  }

  async findByProductId(productId: string): Promise<CartDocument> {
    return await this.cartModel.findOne({productId: productId}).exec();
  }
}
