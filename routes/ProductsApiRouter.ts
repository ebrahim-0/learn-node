import { Router } from "express";
import path from "path";
import ProductService from "../services/ProductService";
import ProductsController from "../controllers/ProductsController";

const productsApiRouter = Router();

const dbPath = path.join(path.dirname(__dirname), "data", "db.json");

const productService = new ProductService(dbPath);
const productController = new ProductsController(productService);

const {
  getAllProducts,
  createProduct,
  getSingeProduct,
  updateProduct,
  deleteProduct,
} = productController;

productsApiRouter.route("/").get(getAllProducts).post(createProduct);

productsApiRouter
  .route("/:id")
  .get(getSingeProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

export default productsApiRouter;
