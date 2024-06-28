import { QueryResult } from "pg";
import pool from "../models/db";
import { IProduct } from "../types";

export default class ProductService {
  constructor() {
    console.log("🚀 ProductService initialized");
  }

  async getAllProducts(
    limit: number = 10,
    offset: number = 0
  ): Promise<QueryResult> {
    const query = `SELECT * FROM products LIMIT $1 OFFSET $2`;
    return await pool.query(query, [limit, offset]);
  }

  async getTotalCount(): Promise<number> {
    const query = `SELECT COUNT(*) FROM products`;
    const result = await pool.query(query);
    return parseInt(result.rows[0].count);
  }

  async getProductsByFilter(
    filter: string,
    limit: number = 10,
    offset: number = 0
  ): Promise<QueryResult> {
    const query = `SELECT id, ${filter} FROM products LIMIT $1 OFFSET $2`;
    return await pool.query(query, [limit, offset]);
  }

  async getProductsByIds(
    ids: string[],
    limit: number = 10,
    offset: number = 0
  ): Promise<QueryResult> {
    const query = `SELECT * FROM products WHERE id = ANY($1) LIMIT $2 OFFSET $3`;
    return await pool.query(query, [ids, limit, offset]);
  }

  async getSingleProductById(id: number): Promise<QueryResult> {
    const query = `SELECT * FROM products WHERE id = $1`;
    return await pool.query(query, [id]);
  }

  async createProduct(product: IProduct): Promise<QueryResult> {
    const { name, price, description, qty } = product;

    const setSequenceQuery =
      "SELECT setval('products_id_seq', (SELECT MAX(id) FROM products))";

    await pool.query(setSequenceQuery);

    const insertQuery = `INSERT INTO products (name, price, description, qty) VALUES ($1, $2, $3, $4) RETURNING *`;
    return await pool.query(insertQuery, [name, price, description, qty]);
  }

  async updateProduct(id: number, product: IProduct): Promise<QueryResult> {
    const { name, price, description, qty } = product;

    const productToUpdate = await this.getSingleProductById(id);

    const query = `UPDATE products SET name = $1, price = $2, description = $3, qty = $4 WHERE id = ${id} RETURNING *`;
    return await pool.query(query, [
      name || productToUpdate.rows[0].name,
      price || productToUpdate.rows[0].price,
      description || productToUpdate.rows[0].description,
      qty || productToUpdate.rows[0].qty,
    ]);
  }

  async deleteProduct(id: number): Promise<QueryResult> {
    const query = `DELETE FROM products WHERE id = $1`;
    return await pool.query(query, [id]);
  }
}
