import { Request, Response } from "express";
import readFile from "../utils/readFile";
import { IProduct, IProductBody, IReturnedProduct } from "../types";
import writeFile from "../utils/writeFile";

export default class ProductService {
  constructor(private dbPath: string) {}

  async findAllInDb(req: Request, res: Response) {
    const data = await readFile(this.dbPath, res);
    return data;
  }

  // ** Create a new product

  async createProduct(req: Request, res: Response, productBody: IProductBody) {
    const data = await this.findAllInDb(req, res);

    const newProduct: IProduct = {
      id: data.products.length + 1,
      ...productBody,
    };

    data.products.push(newProduct);

    writeFile(this.dbPath, data);
  }

  // ** Get all products

  async getAllProducts(req: Request, res: Response) {
    const data = await this.findAllInDb(req, res);

    return data.products;
  }

  // ** Get products by IDs

  async getProductByIds(req: Request, res: Response, ids: string[]) {
    const data = await this.findAllInDb(req, res);

    if (ids?.length) {
      return data.products.filter((product: IProduct) =>
        ids.includes(product.id.toString())
      );
    }
  }

  // ** Get products by filter
  async getProductsByFilter(
    req: Request,
    res: Response,
    filteredParams: string
  ) {
    const data = await this.findAllInDb(req, res);

    const fieldsToFilter = filteredParams.split(",");

    return data.products.map((product: IProduct) => {
      let result: IReturnedProduct = { id: product.id };
      fieldsToFilter.forEach((field) => {
        if (product.hasOwnProperty(field)) {
          result[field as keyof IProduct] = product[field as keyof IProduct];
        }
      });

      return result;
    });
  }

  // ** Get a single product

  async getProductById(req: Request, res: Response, id: number) {
    const data = await this.findAllInDb(req, res);

    return data.products.find((product: IProduct) => product.id === id);
  }

  async updateProduct(req: Request, res: Response, productIndex: number) {
    const data = await this.findAllInDb(req, res);

    data.products[productIndex] = {
      ...data.products[productIndex],
      ...req.body,
    };

    writeFile(this.dbPath, data);
  }

  // ** delete a product

  async deleteProduct(req: Request, res: Response, productIndex: number) {
    const data = await this.findAllInDb(req, res);

    data.products.splice(productIndex, 1);

    writeFile(this.dbPath, data);
  }
}
