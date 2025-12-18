import { Product, ProductsResponse } from "@/shared/models/responses";
import { api } from "../axios";

/**
 * @description Obter lista de produtos.
 * @returns Uma promessa com uma lista de produtos.
 * @author Felipe Baptistella.
 */
export async function getProducts() {
  const { data } = await api.get<ProductsResponse>("/products");
  return data.products as Product[];
}
