import path from "path";
import ProductService from "../services/ProductService";
import ProductsController from "../controller/ProductsController";
import ProductsViewController from "../controller/ProductsViewController";

const dbPath = path.join(path.dirname(__dirname), "data", "db.json");

const productService = new ProductService(dbPath);

const productController = new ProductsController(productService);

const productViewController = new ProductsViewController(productService);

export { dbPath, productService, productController, productViewController };
