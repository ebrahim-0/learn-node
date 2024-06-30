import { Router } from "express";
import { productsController } from ".";

const productsApiRouter = Router();

console.log("🚀 productsApiRouter");

const {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = productsController;

productsApiRouter.route("/").get(getAllProducts).post(createProduct);

productsApiRouter
  .route("/:id")
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

export default productsApiRouter;
