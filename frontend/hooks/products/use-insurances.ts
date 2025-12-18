import { getInsurances } from "@/lib/api/insurances";
import { useQuery } from "@tanstack/react-query";

/**
 * @description Efetuar busca por lista de apólices.
 */
export function useInsurances() {
  return useQuery({
    queryKey: ["insurances"],
    queryFn: getInsurances,
  });
}
