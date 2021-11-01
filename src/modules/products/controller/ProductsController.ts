import { Request, Response } from 'express';
import ListProductService from '@modules/products/services/ListProductService';
import ShowProductService from '@modules/products/services/ShowProductService';
import CreateProductService from '@modules/products/services/CreateProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const allProducts = new ListProductService();
    return response.json(await allProducts.execute());
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showProduct = new ShowProductService();
    return response.json(await showProduct.execute({ id }));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const createProduct = new CreateProductService();
    const product = await createProduct.execute({ name, price, quantity });
    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;
    const updateProduct = new UpdateProductService();

    const updatedProduct = await updateProduct.execute({
      id,
      name,
      price,
      quantity,
    });
    return response.json(updatedProduct);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteProduct = new DeleteProductService();

    await deleteProduct.execute(id);

    return response.json('Product deleted with success!');
  }
}
