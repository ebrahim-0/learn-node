import { Router } from "express";
import ProductServiceSql from "../services/ProductServiceSql";
import ProductsControllerSql from "../controllers/ProductsControllerSql";

const productsApiRouterSql = Router();

console.log("🚀 productsApiRouterSql");

const productServiceSql = new ProductServiceSql();

const productsControllerSql = new ProductsControllerSql(productServiceSql);

const {
  getAllProducts,
  createProduct,
  getSingeProduct,
  updateProduct,
  deleteProduct,
} = productsControllerSql;

productsApiRouterSql.route("/").get(getAllProducts).post(createProduct);

productsApiRouterSql
  .route("/:id")
  .get(getSingeProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

export default productsApiRouterSql;
