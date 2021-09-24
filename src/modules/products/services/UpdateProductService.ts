import Product from '@modules/products/typeorm/entities/Product';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne(id);
    const nameAlreadyInUse = await productsRepository.findByName(name);

    if (!product) {
      throw new AppError('Product does not exist on the database', 404);
    }

    if (nameAlreadyInUse) {
      throw new AppError('A product with this name already exists!', 412);
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
