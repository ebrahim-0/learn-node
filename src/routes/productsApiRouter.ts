import { Router } from "express";
import { productsController } from ".";

const productsApiRouter = Router();

const {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = productsController;

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operations related to products
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: Array of product IDs to filter by
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filter products by a specific criterion
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of products to return
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number of products to return
 *     responses:
 *       '200':
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 hasMore:
 *                   type: boolean
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       '201':
 *         description: Created product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Invalid request body
 */
productsApiRouter.route("/").get(getAllProducts).post(createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Retrieve a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to retrieve
 *     responses:
 *       '200':
 *         description: A single product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '404':
 *         description: Product not found
 */

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to update
 *       - in: body
 *         name: product
 *         required: true
 *         description: The product object to update
 *         schema:
 *           $ref: '#/components/schemas/Product'
 *     responses:
 *       '200':
 *         description: Updated product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '404':
 *         description: Product not found
 */

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to delete
 *     responses:
 *       '200':
 *         description: Product deleted successfully
 *       '404':
 *         description: Product not found
 */

productsApiRouter
  .route("/:id")
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

export default productsApiRouter;
