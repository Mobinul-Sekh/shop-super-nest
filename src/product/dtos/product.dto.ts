export class ProductDTO {
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAddedToCart: boolean;
  rating: {
    rate: number;
    count: number;
  };
}