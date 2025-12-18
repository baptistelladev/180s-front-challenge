import { getProducts } from "@/lib/api/products";
import { useQuery } from "@tanstack/react-query";

/**
 * @description Efetuar busca por lista de produtos.
 */
export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}
