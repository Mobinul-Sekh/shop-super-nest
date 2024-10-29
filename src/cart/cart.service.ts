import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CartDTO } from './dtos/cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from 'src/schemas/cart.schema';
import { ResponseInterface } from 'src/error-handler/interfaces';
import { ProductService } from 'src/product/product.service';
import { ProductDTO } from 'src/product/dtos/product.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel("cart") private cartModel: Model<Cart>,

    private readonly productService: ProductService
  ) {}

  async addProductToCart(cartDto: CartDTO): Promise<ResponseInterface> {
    try {
      const productExists = await this.findByProductId(cartDto.productId);
      if (productExists.data) {
        throw new BadRequestException("product already exists in cart!");
      }

      const prodResponse = await this.productService.findByProductId(cartDto.productId);
      prodResponse.data.isAddedToCart = true;
      await this.productService.createProduct(prodResponse.data as ProductDTO);

      const createdCartProduct = new this.cartModel(cartDto);
      const response = await createdCartProduct.save();

      return {
        success: true,
        message: "successfully added product to the cart",
        data: response
      }
    } catch(err) {
      throw new HttpException({message: err.message, success: false}, err.status);
    }
  }

  async findAllProductsInCart(): Promise<ResponseInterface> {
    try {
      return {
        success: true,
        message: "successfully fetched all cart products",
        data: await this.cartModel.find().exec()
      }
    } catch(err) {
      throw new HttpException({message: err.message, success: false}, err.status);
    }
  }

  async findByProductId(productId: string): Promise<ResponseInterface> {
    try {
      return {
        success: true,
        message: "successfully fetched cart product",
        data: await this.cartModel.findOne({productId: productId}).exec()
      }
    } catch(err) {
      throw new HttpException({message: err.message, success: false}, err.status);
    }
  }
}
