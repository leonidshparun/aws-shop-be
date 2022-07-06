import mockResponseData from './mock-products.json';
import { Product } from '../models/product.model';

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getProductList = async (): Promise<Product[]> => {
  await delay(20);
  return mockResponseData;
};

export const getProductById = async (productId: string): Promise<Product> => {
  await delay(20);

  const product = mockResponseData.find((product) => product.id === productId);

  if (product) {
    return product;
  } else {
    throw new Error(`Product with productId: "${productId}" not found!`);
  }
};
