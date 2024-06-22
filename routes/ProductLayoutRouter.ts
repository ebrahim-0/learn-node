import { Router } from "express";
import ProductService from "./../services/ProductService";
import ProductsViewController from "../controllers/ProductsViewController";
import path from "path";

const ProductLayoutRouter = Router();

const dbPath = path.join(path.dirname(__dirname), "data", "db.json");

const productService = new ProductService(dbPath);
const productViewController = new ProductsViewController(productService);

const { renderProductsPage, renderProductPage } = productViewController;

ProductLayoutRouter.route("/").get(renderProductsPage);

ProductLayoutRouter.route("/:id").get(renderProductPage);

export default ProductLayoutRouter;
