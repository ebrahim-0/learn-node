import { Request, Response, NextFunction } from "express";
import ProductService from "../services/ProductService";
import { IProduct, IProductBody } from "../types";

export default class ProductsController {
  constructor(private _productService: ProductService) {
    this.createProduct = this.createProduct.bind(this);
    this.getAllProducts = this.getAllProducts.bind(this);
    this.getSingeProduct = this.getSingeProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productBody: IProductBody = req.body;
      if (!productBody.name || !productBody.price || !productBody.description) {
        return res.status(400).json({ message: "All fields are required" });
      }

      await this._productService.createProduct(req, res, productBody);
      return res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
      next(error);
    }
  }

  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      // throw new Error("Something went wrong 🔥");
      const ids = req.query.id as string[];
      const filteredParams = req.query.filter as string;

      if (ids?.length || filteredParams) {
        if (filteredParams) {
          const productToReturn =
            await this._productService.getProductsByFilter(
              req,
              res,
              filteredParams
            );
          return res.status(200).json({ products: productToReturn });
        }
        if (ids?.length) {
          const filteredProducts = await this._productService.getProductByIds(
            req,
            res,
            ids
          );
          return res.status(200).json({ products: filteredProducts });
        }
      } else {
        const data = await this._productService.getAllProducts(req, res);
        return res.status(200).json({ products: data });
      }
    } catch (error) {
      next(error);
    }
  }

  async getSingeProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id;
      if (isNaN(id)) {
        return res.status(404).json({ message: "Invalid ID" });
      }

      const product = await this._productService.getProductById(req, res, id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json({ product });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id;
      if (isNaN(id)) {
        return res.status(404).json({ message: "Invalid ID" });
      }

      const data = await this._productService.findAllInDb(req, res);
      const productIndex = data.products.findIndex(
        (product: IProduct) => product.id === id
      );

      if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
      }

      await this._productService.updateProduct(req, res, productIndex);
      return res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id;
      if (isNaN(id)) {
        return res.status(404).json({ message: "Invalid ID" });
      }

      const data = await this._productService.findAllInDb(req, res);
      const productIndex = data.products.findIndex(
        (product: IProduct) => product.id === id
      );

      if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
      }

      await this._productService.deleteProduct(req, res, productIndex);
      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}
