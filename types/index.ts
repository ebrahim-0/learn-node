export interface IReturnedProduct {
  id: number;
  [key: string]: any;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  qty: number;
  image?: string;
}

export interface IProductBody {
  name: string;
  price: number;
  description: string;
}
