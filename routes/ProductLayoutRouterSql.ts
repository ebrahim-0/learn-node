import { Router } from "express";
import ProductServiceSql from "../services/ProductServiceSql";
import ProductsViewControllerSql from "../controllers/ProductsViewControllerSql";

const ProductLayoutRouterSql = Router();

const productServiceSql = new ProductServiceSql();

const productsViewControllerSql = new ProductsViewControllerSql(
  productServiceSql
);

const { renderProductPage, renderProductsPage } = productsViewControllerSql;

ProductLayoutRouterSql.route("/").get(renderProductsPage);

ProductLayoutRouterSql.route("/:id").get(renderProductPage);

export default ProductLayoutRouterSql;
