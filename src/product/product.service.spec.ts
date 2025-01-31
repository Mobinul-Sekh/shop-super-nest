import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Product, ProductDocument } from '../schemas/products.schema';
import { ProductDetails } from '../schemas/product-details.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Category } from 'src/schemas/category.schema';

const mockProduct: Product = {
  title: 'Mobile',
  price: 20000,
  image: 'abc.com',
  isAddedToCart: false,
  rating: {
    rate: 4,
    count: 500
  },
  productDetails: new ProductDetails,
  category: new Category
}

describe('ProductService', () => {
  let service: ProductService;
  let model: Model<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken(Product.name),
          useValue: {
            create: jest.fn().mockResolvedValue(mockProduct), // ✅ Mock create method
            findOne: jest.fn().mockResolvedValue(mockProduct), // ✅ Mock findOne method
            findById: jest.fn().mockResolvedValue(mockProduct), // ✅ Mock findById method
            save: jest.fn().mockResolvedValue(mockProduct), // ✅ Mock save method
          }
        }
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    model = module.get<Model<Product>>(getModelToken(Product.name));
  });

  
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return null if product is not found', async () => {
    const result = await service.findByProductId('999');
    expect(result).toBeNull();
  });
});
