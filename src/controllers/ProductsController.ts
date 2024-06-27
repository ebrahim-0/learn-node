import { NextFunction, Request, Response } from "express";
import ProductService from "../services/ProductService";

export default class ProductsController {
  constructor(private _ProductService: ProductService) {
    this.getAllProducts = this.getAllProducts.bind(this);
    this.getSingleProduct = this.getSingleProduct.bind(this);

    this.createProduct = this.createProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);

    console.log("🚀 ProductsController initialized");
  }

  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const ids = req.query.id as string[];
      const filter = req.query.filter as string;

      const limit = parseInt(req.query.limit as string, 10) || 10;
      const page = parseInt(req.query.page as string, 10) || 1;
      const offset = (page - 1) * limit;

      const totalCount = await this._ProductService.getTotalCount();

      if (ids?.length) {
        const formattedIds = Array.isArray(ids) ? ids : [ids];
        const products = await this._ProductService.getProductsByIds(
          formattedIds,
          limit,
          offset
        );

        if (!products.rowCount) {
          return res.status(404).json({ message: "Product not found" });
        }

        const totalPages = Math.ceil((totalCount as number) / limit);

        res.status(200).json({
          products: products.rows,
          page,
          limit,
          offset,
          totalPages,
          hasMore: totalPages > page,
        });
      } else if (filter) {
        const products = await this._ProductService.getProductsByFilter(
          filter,
          limit,
          offset
        );

        const totalPages = Math.ceil((totalCount as number) / limit);

        res.status(200).json({
          products: products.rows,
          page,
          limit,
          offset,
          totalPages,
          hasMore: totalPages > page,
        });
      } else {
        const products = await this._ProductService.getAllProducts(
          limit,
          offset
        );

        const totalPages = Math.ceil((totalCount as number) / limit);

        res.status(200).json({
          products: products.rows,
          page,
          limit,
          offset,
          totalPages,
          hasMore: totalPages > page,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async getSingleProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id;
      if (isNaN(id)) {
        return res.status(404).json({ message: "Invalid ID" });
      }
      const product = await this._ProductService.getSingleProductById(id);

      if (!product.rowCount) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({
        product: product.rows,
        length: product.rowCount,
      });
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = req.body;
      const newProduct = await this._ProductService.createProduct(product);
      res.status(201).json({
        product: newProduct.rows,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id;
      const product = req.body;
      if (isNaN(id)) {
        return res.status(404).json({ message: "Invalid ID" });
      }

      const productToUpdate = await this._ProductService.getSingleProductById(
        id
      );

      if (!productToUpdate.rowCount) {
        return res.status(404).json({ message: "Product not found" });
      }

      const updatedProduct = await this._ProductService.updateProduct(
        id,
        product
      );
      res.status(200).json({
        product: updatedProduct.rows,
      });
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
      const product = await this._ProductService.deleteProduct(id);

      if (!product.rowCount) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}
