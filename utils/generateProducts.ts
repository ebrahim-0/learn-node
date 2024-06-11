import { faker } from "@faker-js/faker";
import { IProduct } from "../types";

const generateProducts = (count: number): IProduct[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: faker.commerce.productName(),
    price: +faker.commerce.price(),
    description: faker.commerce.productDescription(),
  }));
};

export default generateProducts;
