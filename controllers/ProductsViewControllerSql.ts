import { NextFunction, Request, Response } from "express";
import ProductServiceSql from "../services/ProductServiceSql";

export default class ProductsViewControllerSql {
  constructor(private _ProductServiceSql: ProductServiceSql) {
    this.renderProductsPage = this.renderProductsPage.bind(this);
    this.renderProductPage = this.renderProductPage.bind(this);
  }

  async renderProductsPage(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await this._ProductServiceSql.getAllProducts();

      res.render("Pages/products", {
        title: "Products",
        products: products.rows,
        isActiveRoute: res.locals.isActiveRoute,
        v: "v2",
      });
    } catch (error) {
      next(error);
    }
  }

  async renderProductPage(req: Request, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id;

      if (isNaN(id)) {
        return res.status(404).json({ message: "Invalid ID" });
      }

      const product = await this._ProductServiceSql.getSingeProductById(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.render("Pages/product", {
        title: "Product - " + product.rows[0].id,
        product: product.rows[0],
        v: "v2",
        isActiveRoute: res.locals.isActiveRoute,
      });
    } catch (error) {
      next(error);
    }
  }
}
