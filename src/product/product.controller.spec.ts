import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ResponseInterface } from '../error-handler/interfaces';
import { Product, ProductDocument } from '../schemas/products.schema';
import { HttpException } from '@nestjs/common';
import { ProductDetails } from 'src/schemas/product-details.schema';
import { Category } from 'src/schemas/category.schema';

// ✅ Mock Product Data
const mockProduct: Product = {
  id: '123',
  title: 'Mobile',
  price: 20000,
  image: 'abc.com',
  isAddedToCart: false,
  rating: { rate: 4, count: 500 },
  productDetailsId: '567',
  productDetails: new ProductDetails,
  category: new Category
};

// ✅ Mock Service Methods
const mockProductService = {
  createProduct: jest.fn().mockResolvedValue(mockProduct),
  findAllProducts: jest.fn().mockResolvedValue([mockProduct]),
  findByProductId: jest.fn().mockResolvedValue(mockProduct),
};

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{ provide: ProductService, useValue: mockProductService }],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createProduct', () => {
    it('should create a product successfully', async () => {
      const result: ResponseInterface = await controller.createProduct(mockProduct as ProductDocument);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockProduct);
      expect(mockProductService.createProduct).toHaveBeenCalledWith(mockProduct);
    });

    it('should throw an error if createProduct fails', async () => {
      jest.spyOn(service, 'createProduct').mockRejectedValue(new HttpException('Failed', 400));
      await expect(controller.createProduct(mockProduct as ProductDocument)).rejects.toThrow(HttpException);
    });
  });

  describe('findProducts', () => {
    it('should return all products', async () => {
      const result: ResponseInterface = await controller.findProducts();
      expect(result.success).toBe(true);
      expect(result.data).toEqual([mockProduct]);
      expect(mockProductService.findAllProducts).toHaveBeenCalled();
    });

    it('should throw an error if findProducts fails', async () => {
      jest.spyOn(service, 'findAllProducts').mockRejectedValue(new HttpException('Failed', 400));
      await expect(controller.findProducts()).rejects.toThrow(HttpException);
    });
  });

  describe('findByProductId', () => {
    it('should return a product by ID', async () => {
      const result = await controller.findByProductId(mockProduct.id);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockProduct);
      expect(mockProductService.findByProductId).toHaveBeenCalledWith(mockProduct.id);
    });

    it('should throw an error if findByProductId fails', async () => {
      jest.spyOn(service, 'findByProductId').mockRejectedValue(new HttpException('Not Found', 404));
      await expect(controller.findByProductId(mockProduct.id)).rejects.toThrow(HttpException);
    });
  });
});
