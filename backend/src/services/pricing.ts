import { Product, QuotationInput } from '../models';

export function calculatePremium(product: Product, input: QuotationInput): {
  base: number;
  coverages: number;
  coveragesById: Record<string, number>;
  risk: number;
  total: number;
} {
  const base = product.basePremium;

  const selectedCoverages = product.coverages.filter((c) =>
    input.selectedCoverageIds.includes(c.id)
  );
  const coveragesById = selectedCoverages.reduce<Record<string, number>>((acc, c) => {
    acc[c.id] = roundToCents(base * c.priceFactor);
    return acc;
  }, {});
  const coveragesValue = Object.values(coveragesById).reduce((acc, v) => acc + v, 0);

  const riskFactor = estimateRiskFactor(product.productType, input.objectData);
  const riskValue = roundToCents(base * riskFactor);

  const total = roundToCents(base + coveragesValue + riskValue);

  return { base, coverages: coveragesValue, coveragesById, risk: riskValue, total };
}

function estimateRiskFactor(productType: Product['productType'], objectData: Record<string, unknown>): number {
  switch (productType) {
    case 'residencial': {
      const constructionType = String(objectData['constructionType'] ?? 'alvenaria');
      if (constructionType === 'madeira') return 0.2;
      if (constructionType === 'mista') return 0.1;
      return 0;
    }
    case 'vida': {
      const smoker = Boolean(objectData['smoker']);
      const hasChronicDisease = Boolean(objectData['hasChronicDisease']);
      let f = 0;
      if (smoker) f += 0.3;
      if (hasChronicDisease) f += 0.2;
      return f;
    }
    case 'celular': {
      const purchaseDateStr = String(objectData['purchaseDate'] ?? '');
      const hasCase = Boolean(objectData['hasCase']);
      let f = 0;
      const today = new Date();
      const purchaseDate = purchaseDateStr ? new Date(purchaseDateStr) : undefined;
      if (purchaseDate) {
        const years = (today.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
        if (years >= 2) f += 0.1; // aparelhos mais antigos, maior risco
        else f -= 0.05; // novos, ligeiro desconto
      }
      if (hasCase) f -= 0.05; // usa capa, ligeira redução de risco
      return Math.max(f, -0.1); // não reduzir demais
    }
    default:
      return 0;
  }
}

function roundToCents(value: number): number {
  return Math.round(value * 100) / 100;
}