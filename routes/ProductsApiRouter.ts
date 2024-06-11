import { Router } from "express";
import { productController } from ".";

const productsApiRouter = Router();

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
