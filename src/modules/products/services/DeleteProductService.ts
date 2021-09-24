import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';

interface IRequest {
  id: number;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product does not exist on the database', 404);
    }

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
