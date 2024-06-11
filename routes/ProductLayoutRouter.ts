import { Router } from "express";
import { productViewController } from ".";

const ProductLayoutRouter = Router();

const { renderProductsPage, renderProductPage } = productViewController;

ProductLayoutRouter.route("/").get(renderProductsPage);

ProductLayoutRouter.route("/:id").get(renderProductPage);

export default ProductLayoutRouter;
