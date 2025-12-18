import { InsurancePolicy, InsurancesResponse } from "@/shared/models/responses";
import { api } from "../axios";

/**
 * @description Obter lista de apólices.
 * @returns Uma promessa com uma lista de apólices.
 * @author Felipe Baptistella.
 */
export async function getInsurances() {
  const { data } = await api.get<InsurancesResponse>("/insurances");
  console.log(data);

  return data.insurances as InsurancePolicy[];
}
