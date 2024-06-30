import ProductsController from "../controllers/ProductsController";
import ProductsViewController from "../controllers/ProductsViewController";
import ProductService from "../services/ProductService";

const productService = Object.freeze(new ProductService());

const productsViewController = Object.freeze(
  new ProductsViewController(productService)
);

const productsController = Object.freeze(
  new ProductsController(productService)
);

export { productsViewController, productsController };
