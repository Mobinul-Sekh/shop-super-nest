import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart, CartDocument } from '../schemas/cart.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ResponseInterface } from '../error-handler/interfaces';

describe('CartController', () => {
  let cartController: CartController;
  let cartService: CartService;

  const mockCart: Cart = {
    id: 'mock-cart-id',
    productId: 'mock-product-id',
    userId: 'mock-user-id',
    productQty: 1,
    user: null, // Not focusing on user in this test
    product: null, // Not focusing on product in this test
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        {
          provide: CartService,
          useValue: {
            addProductToCart: jest.fn().mockResolvedValue(mockCart),
            findAllProductsInCart: jest.fn().mockResolvedValue([mockCart]),
            findByProductId: jest.fn().mockResolvedValue(mockCart),
          },
        },
      ],
    }).compile();

    cartController = module.get<CartController>(CartController);
    cartService = module.get<CartService>(CartService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addProductToCart', () => {
    it('should successfully add a product to the cart', async () => {
      const body: Cart = mockCart;

      const result: ResponseInterface = await cartController.addProductToCart(body as CartDocument);

      expect(result.success).toBe(true);
      expect(result.message).toBe('successfully saved the product in cart');
      expect(result.data).toEqual(mockCart);
      expect(cartService.addProductToCart).toHaveBeenCalledWith(body);
    });

    it('should throw an error if the service throws an error', async () => {
      const body: Cart = mockCart;
      // Properly mock the rejection
      cartService.addProductToCart = jest.fn().mockRejectedValueOnce(new BadRequestException('Bad request'));

      await expect(cartController.addProductToCart(body as CartDocument)).rejects.toThrowError(BadRequestException);
    });
  });

  describe('findAllProductsInCart', () => {
    it('should successfully fetch all products in the cart', async () => {
      const result: ResponseInterface = await cartController.findAllProductsInCart();

      expect(result.success).toBe(true);
      expect(result.message).toBe('successfully fetched all products in cart');
      expect(result.data).toEqual([mockCart]);
      expect(cartService.findAllProductsInCart).toHaveBeenCalled();
    });

    it('should throw an error if the service throws an error', async () => {
      // Properly mock the rejection
      cartService.findAllProductsInCart = jest.fn().mockRejectedValueOnce(new NotFoundException('No products found'));

      await expect(cartController.findAllProductsInCart()).rejects.toThrowError(NotFoundException);
    });
  });

  describe('findByProductId', () => {
    it('should successfully fetch a product by its ID', async () => {
      const productId = 'mock-product-id';
      const result: ResponseInterface = await cartController.findByProductId(productId);

      expect(result.success).toBe(true);
      expect(result.message).toBe(`successfully fetched product with id ${productId}`);
      expect(result.data).toEqual(mockCart);
      expect(cartService.findByProductId).toHaveBeenCalledWith(productId);
    });

    it('should throw an error if the product is not found', async () => {
      const productId = 'mock-product-id';
      // Properly mock the rejection
      cartService.findByProductId = jest.fn().mockRejectedValueOnce(new NotFoundException('Product not found'));

      await expect(cartController.findByProductId(productId)).rejects.toThrowError(NotFoundException);
    });
  });
});
