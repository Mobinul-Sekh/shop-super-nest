import { Body, Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDocument } from '../schemas/cart.schema';
import { ResponseInterface } from '../error-handler/interfaces';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService
  ) {}

  @Post('add')
  async addProductToCart (
    @Body() body: CartDocument
  ): Promise<ResponseInterface> {
    try {
      return {
        success: true,
        message: `successfully saved the product in cart`,
        data: await this.cartService.addProductToCart(body)
      }
    } catch (err) {
      throw err;
    }
  }

  @Get('findAll')
  async findAllProductsInCart(): Promise<ResponseInterface> {
    try {
      return {
        success: true,
        message: `successfully fetched all products in cart`,
        data: await this.cartService.findAllProductsInCart()
      }
    } catch (err) {
      throw err;
    }
  }

  @Get('findById/:productId')
  async findByProductId(
    @Param('productId') productId: string
  ): Promise<ResponseInterface> {
    try {
      return {
        success: true,
        message: `successfully fetched product with id ${productId}`,
        data: await this.cartService.findByProductId(productId)
      }
    } catch (err) {
      throw err;
    }
  }
}
