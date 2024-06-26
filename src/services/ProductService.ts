import pool from "../models/db";
import { IProduct } from "../types";

export default class ProductService {
  constructor() {
    console.log("🚀 ProductService initialized");
  }

  async getAllProducts(limit: number = 10, offset: number = 0) {
    return await pool.query(`SELECT * FROM products LIMIT $1 OFFSET $2`, [
      limit,
      offset,
    ]);
  }

  async getTotalCount() {
    const all = await pool.query(`SELECT * FROM PRODUCTS`);
    return all.rowCount;
  }

  async getProductsByFilter(
    filter: string,
    limit: number = 10,
    offset: number = 0
  ) {
    return await pool.query(
      `SELECT id, ${filter} FROM products LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
  }

  async getProductsByIds(
    ids: string[],
    limit: number = 10,
    offset: number = 0
  ) {
    return await pool.query(
      "SELECT * FROM products WHERE id = ANY($1) LIMIT $2 OFFSET $3",
      [ids, limit, offset]
    );
  }

  async getSingleProductById(id: number) {
    return await pool.query(`SELECT * FROM products WHERE id = ${id}`);
  }

  async createProduct(product: IProduct) {
    const { name, price, description, qty } = product;

    await pool.query(
      "SELECT setval('products_id_seq', (SELECT MAX(id) FROM products))"
    );

    return await pool.query(
      `INSERT INTO products (name, price, description, qty) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, price, description, qty]
    );
  }

  async updateProduct(id: number, product: IProduct) {
    const { name, price, description, qty } = product;

    const productToUpdate = await this.getSingleProductById(id);

    return await pool.query(
      `UPDATE products SET name = $1, price = $2, description = $3, qty = $4 WHERE id = ${id} RETURNING *`,
      [
        name || productToUpdate.rows[0].name,
        price || productToUpdate.rows[0].price,
        description || productToUpdate.rows[0].description,
        qty || productToUpdate.rows[0].qty,
      ]
    );
  }

  async deleteProduct(id: number) {
    return await pool.query(`DELETE FROM products WHERE id = ${id}`);
  }
}
