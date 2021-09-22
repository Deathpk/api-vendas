import Product from '@modules/products/typeorm/entities/Product';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: number;
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product | undefined> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product does not exist on the database.', 404);
    }

    return product;
  }
}

export default ShowProductService;
