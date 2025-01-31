import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { ProductService } from '../product/product.service';
import { Cart, CartDocument } from '../schemas/cart.schema';
import { Product, ProductDocument } from '../schemas/products.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Category } from 'src/schemas/category.schema';

describe('CartService', () => {
  let cartService: CartService;
  let productService: ProductService;
  let cartModel: Model<CartDocument>;
  let productModel: Model<ProductDocument>;

  const createMockProduct = (overrides?: Partial<Product>): Product => ({
    id: '123',
    title: 'Test Product',
    price: 100,
    image: 'test-image.jpg',
    isAddedToCart: false,
    rating: { rate: 4.5, count: 100 },
    productDetailsId: 'productDetails1',
    productDetails: { productDetailsId: 'productDetails1' } as any,
    category: new Category,
    ...overrides,
  });

  const createMockCart = (overrides?: Partial<Cart>): Cart => ({
    id: 'cart123',
    productId: '123',
    userId: 'user1',
    productQty: 2,
    user: { id: 'user1' } as any,
    product: createMockProduct(),
    ...overrides,
  });

  const mockProductService = {
    findByProductId: jest.fn(),
    createProduct: jest.fn(),
  };

  const mockCartModel = {
    findOne: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };

  const mockProductModel = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        { provide: ProductService, useValue: mockProductService },
        { provide: getModelToken(Cart.name), useValue: mockCartModel },
        { provide: getModelToken(Product.name), useValue: mockProductModel },
      ],
    }).compile();

    cartService = module.get<CartService>(CartService);
    productService = module.get<ProductService>(ProductService);
    cartModel = module.get<Model<CartDocument>>(getModelToken(Cart.name));
    productModel = module.get<Model<ProductDocument>>(getModelToken(Product.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(cartService).toBeDefined();
  });

  describe('addProductToCart', () => {
    it('should throw BadRequestException if product already exists in the cart', async () => {
      mockCartModel.findOne.mockResolvedValueOnce(createMockCart());

      const cartDto: Cart = createMockCart({ productQty: 3 });

      await expect(cartService.addProductToCart(cartDto as CartDocument)).rejects.toThrowError(BadRequestException);
    });

    it('should throw NotFoundException if product does not exist', async () => {
      mockCartModel.findOne.mockResolvedValueOnce(null);
      mockProductService.findByProductId.mockResolvedValueOnce(null);

      const cartDto: Cart = createMockCart();

      await expect(cartService.addProductToCart(cartDto as CartDocument)).rejects.toThrowError(NotFoundException);
    });

    it('should successfully add product to cart', async () => {
      const product = createMockProduct();
      mockCartModel.findOne.mockResolvedValueOnce(null);
      mockProductService.findByProductId.mockResolvedValueOnce(product);
      mockProductService.createProduct.mockResolvedValueOnce({ ...product, isAddedToCart: true });
      mockCartModel.save.mockResolvedValueOnce(createMockCart());

      const cartDto: Cart = createMockCart();

      const result = await cartService.addProductToCart(cartDto as CartDocument);

      expect(result).toBeDefined();
      expect(mockProductService.createProduct).toHaveBeenCalledWith({
        ...product,
        isAddedToCart: true,
      });
      expect(mockCartModel.save).toHaveBeenCalled();
    });
  });

  describe('findAllProductsInCart', () => {
    it('should return an array of products in the cart', async () => {
      const cartItem = createMockCart();
      mockCartModel.find.mockResolvedValueOnce([cartItem]);

      const result = await cartService.findAllProductsInCart();

      expect(result).toEqual([cartItem]);
      expect(mockCartModel.find).toHaveBeenCalled();
    });
  });

  describe('findByProductId', () => {
    it('should return a product from the cart by productId', async () => {
      const cartItem = createMockCart();
      mockCartModel.findOne.mockResolvedValueOnce(cartItem);

      const result = await cartService.findByProductId('123');

      expect(result).toEqual(cartItem);
      expect(mockCartModel.findOne).toHaveBeenCalledWith({ productId: '123' });
    });

    it('should return null if no product found in the cart', async () => {
      mockCartModel.findOne.mockResolvedValueOnce(null);

      const result = await cartService.findByProductId('123');

      expect(result).toBeNull();
    });
  });
});
