import { getProducts } from "@/lib/api/products";
import { useQuery } from "@tanstack/react-query";

/**
 * @description Efetuar busca por lista de apólices.
 * @returns Função nativa do Tanstack Query.
 */
export function UseProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}
