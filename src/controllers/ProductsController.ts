import { NextFunction, Request, Response } from "express";
import ProductService from "../services/ProductService";

export default class ProductsController {
  constructor(private _ProductService: ProductService) {
    // Bind methods to ensure 'this' context is maintained
    this.getAllProducts = this.getAllProducts.bind(this);
    this.getSingleProduct = this.getSingleProduct.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);

    console.log("🚀 ProductsController initialized");
  }

  async getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const ids = req.query.id as string[] | string | undefined;
      const filter = req.query.filter as string | undefined;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const page = parseInt(req.query.page as string, 10) || 1;
      const offset = (page - 1) * limit;

      const totalCount = await this._ProductService.getTotalCount();
      const totalPages = Math.ceil(totalCount / limit);

      let products;

      if (ids) {
        const formattedIds = Array.isArray(ids) ? ids : [ids];
        products = await this._ProductService.getProductsByIds(
          formattedIds,
          limit,
          offset
        );

        if (!products.rowCount) {
          res.status(404).json({ message: "Products not found" });
          return;
        }

        res.status(200).json({
          products: products.rows,
          length: products.rowCount,
        });
        return;
      } else if (filter) {
        products = await this._ProductService.getProductsByFilter(
          filter,
          limit,
          offset
        );
      } else {
        products = await this._ProductService.getAllProducts(limit, offset);
      }

      res.status(200).json({
        products: products.rows,
        page,
        limit,
        totalPages,
        hasMore: totalPages > page,
      });
    } catch (error) {
      next(error);
    }
  }

  async getSingleProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID" });
        return;
      }

      const product = await this._ProductService.getSingleProductById(id);
      if (!product.rowCount) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      res.status(200).json(product.rows[0]);
    } catch (error) {
      next(error);
    }
  }

  async createProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const newProduct = await this._ProductService.createProduct(req.body);
      res.status(201).json({
        product: newProduct.rows[0],
        message: "Product created successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID" });
        return;
      }

      const productToUpdate = await this._ProductService.getSingleProductById(
        id
      );
      if (!productToUpdate.rowCount) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      const updatedProduct = await this._ProductService.updateProduct(
        id,
        req.body
      );
      res.status(200).json({
        product: updatedProduct.rows[0],
        message: "Product updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID" });
        return;
      }

      const product = await this._ProductService.deleteProduct(id);
      if (!product.rowCount) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}
