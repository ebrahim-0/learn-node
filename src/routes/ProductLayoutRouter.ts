import { Router } from "express";
import { productsViewController } from ".";

const ProductLayoutRouter = Router();

const { renderProductPage, renderProductsPage } = productsViewController;

ProductLayoutRouter.route("/").get(renderProductsPage);

ProductLayoutRouter.route("/:id").get(renderProductPage);

export default ProductLayoutRouter;
