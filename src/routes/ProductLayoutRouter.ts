import { Router } from "express";
import ProductService from "../services/ProductService";
import ProductsViewController from "../controllers/ProductsViewController";

const ProductLayoutRouter = Router();

const productService = new ProductService();

const productsViewController = new ProductsViewController(productService);

const { renderProductPage, renderProductsPage } = productsViewController;

ProductLayoutRouter.route("/").get(renderProductsPage);

ProductLayoutRouter.route("/:id").get(renderProductPage);

export default ProductLayoutRouter;
