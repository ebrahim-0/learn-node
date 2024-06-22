import { NextFunction, Request, Response } from "express";
import ProductService from "../services/ProductService";

export default class ProductsViewController {
  constructor(private _productService: ProductService) {
    this.renderProductsPage = this.renderProductsPage.bind(this);
    this.renderProductPage = this.renderProductPage.bind(this);
  }

  async renderProductsPage(req: Request, res: Response, next: NextFunction) {
    try {
      // throw new Error("Test error");
      const products = await this._productService.getAllProducts(req, res);
      res.render("Pages/products", {
        title: "Products",
        products,
        v: "v1",
        isActiveRoute: res.locals.isActiveRoute,
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

      const product = await this._productService.getProductById(req, res, id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.render("Pages/product", {
        title: "Product - " + product.id,
        product,
        v: "v1",
        isActiveRoute: res.locals.isActiveRoute,
      });
    } catch (error) {
      next(error);
    }
  }
}
