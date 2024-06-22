import { Router } from "express";
import ProductService from "../services/ProductService";
import ProductsController from "../controllers/ProductsController";

const productsApiRouter = Router();

console.log("🚀 productsApiRouter");

const productService = new ProductService();

const productsController = new ProductsController(productService);

const {
  getAllProducts,
  createProduct,
  getSingeProduct,
  updateProduct,
  deleteProduct,
} = productsController;

productsApiRouter.route("/").get(getAllProducts).post(createProduct);

productsApiRouter
  .route("/:id")
  .get(getSingeProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

export default productsApiRouter;
