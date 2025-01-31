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
  title: 'Mobile',
  price: 20000,
  image: 'abc.com',
  isAddedToCart: false,
  rating: { rate: 4, count: 500 },
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

});
