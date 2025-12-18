export type ProductType = "residencial" | "vida" | "celular";

export interface Coverage {
  id: string;
  name: string;
  description: string;
  priceFactor: number; // percentual extra do prêmio base (ex: 0.15 = +15%)
}

export interface Product {
  id: string; // UUID
  productType: ProductType;
  name: string;
  description: string;
  coverages: Coverage[];
  basePremium: number; // prêmio base do produto
}

export interface QuotationInput {
  productId: string; // UUID do produto
  selectedCoverageIds: string[];
  objectData: Record<string, unknown>;
}

export interface Quotation extends QuotationInput {
  id: string;
  createdAt: string;
  premiumBreakdown: {
    base: number;
    coverages: number;
    coveragesById: Record<string, number>;
    risk: number;
    total: number;
  };
}

export interface InsuredPerson {
  fullName: string;
  document: string; // CPF
  email: string;
  phone: string;
}

export interface IssueInsuranceInput {
  quotationId: string;
  insured: InsuredPerson;
}

export interface InsurancePolicy {
  id: string;
  policyNumber: string;
  quotationId: string;
  productId: string; // UUID
  objectData: Record<string, unknown>;
  selectedCoverageIds: string[];
  premiumTotal: number;
  insured: InsuredPerson;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface ProductsResponse {
  products: Product[];
}
