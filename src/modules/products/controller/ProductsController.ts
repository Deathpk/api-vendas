import { Request, Response } from 'express';
import ListProductService from '@modules/products/services/ListProductService';
import ShowProductService from '@modules/products/services/ShowProductService';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const allProducts = new ListProductService();
    return response.json(allProducts.execute());
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showProduct = new ShowProductService();
    return response.json(showProduct.execute({ id }));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    //TODO
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    //TODO
  }
}
