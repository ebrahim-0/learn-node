import { NextFunction, Request, Response } from "express";
import ProductServiceSql from "../services/ProductServiceSql";

export default class ProductsControllerSql {
  constructor(private _ProductServiceSql: ProductServiceSql) {
    this.getAllProducts = this.getAllProducts.bind(this);
    this.getSingeProduct = this.getSingeProduct.bind(this);

    this.createProduct = this.createProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);

    console.log("🚀 ProductsControllerSql");
  }

  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const ids = req.query.id as string[];
      const filteredParams = req.query.filter as string;

      if (ids?.length || filteredParams) {
        if (filteredParams) {
          const products = await this._ProductServiceSql.getProductsByFilter(
            filteredParams
          );
          res.status(200).json({ products: products.rows });
        }

        if (ids?.length) {
          const formattedIds = Array.isArray(ids) ? ids : [ids];
          console.log("formattedIds", formattedIds);
          const products = await this._ProductServiceSql.getProductsByIds(
            formattedIds
          );

          if (!products.rowCount) {
            return res.status(404).json({ message: "Product not found" });
          }
          res.status(200).json({ products: products.rows });
        }
      } else {
        const products = await this._ProductServiceSql.getAllProducts();
        res.status(200).json({ products: products.rows });
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
      const product = await this._ProductServiceSql.getSingeProductById(id);

      if (!product.rowCount) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(product.rows);
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = req.body;
      const newProduct = await this._ProductServiceSql.createProduct(product);
      res.status(201).json(newProduct.rows);
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

      const productToUpdate = await this._ProductServiceSql.getSingeProductById(
        id
      );

      if (!productToUpdate.rowCount) {
        return res.status(404).json({ message: "Product not found" });
      }

      const updatedProduct = await this._ProductServiceSql.updateProduct(
        id,
        product
      );
      res.status(200).json(updatedProduct.rows);
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
      const product = await this._ProductServiceSql.deleteProduct(id);

      if (!product.rowCount) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}
