import { randomUUID } from 'crypto';
import { Product, Quotation, InsurancePolicy } from '../models';

class InMemoryStore {
  public readonly products: Product[] = [];
  public readonly quotations: Map<string, Quotation> = new Map();
  public readonly insurances: Map<string, InsurancePolicy> = new Map();

  constructor() {
    this.products = this.buildInitialProducts();
  }

  private buildInitialProducts(): Product[] {
    return [
      {
        id: randomUUID(),
        productType: 'residencial',
        name: 'Seguro Residencial',
        description: 'Proteção para sua residência.',
        basePremium: 100,
        coverages: [
          { id: 'incendio', name: 'Incêndio', description: 'Cobertura contra incêndio.', priceFactor: 0.2 },
          { id: 'roubo', name: 'Roubo', description: 'Cobertura contra roubo.', priceFactor: 0.15 },
          { id: 'vendaval', name: 'Vendaval', description: 'Cobertura contra vendaval.', priceFactor: 0.1 },
        ],
      },
      {
        id: randomUUID(),
        productType: 'vida',
        name: 'Seguro de Vida',
        description: 'Proteção pessoal e familiar.',
        basePremium: 80,
        coverages: [
          { id: 'morte', name: 'Morte', description: 'Indenização por morte.', priceFactor: 0.25 },
          { id: 'invalidez', name: 'Invalidez', description: 'Indenização por invalidez.', priceFactor: 0.2 },
          { id: 'doencas_graves', name: 'Doenças Graves', description: 'Cobertura para doenças graves.', priceFactor: 0.15 },
        ],
      },
      {
        id: randomUUID(),
        productType: 'celular',
        name: 'Seguro Celular',
        description: 'Proteção para o seu smartphone.',
        basePremium: 50,
        coverages: [
          { id: 'roubo_furto', name: 'Roubo e Furto', description: 'Cobertura contra roubo e furto.', priceFactor: 0.3 },
          { id: 'quebra_acidental', name: 'Quebra Acidental', description: 'Cobertura para danos acidentais.', priceFactor: 0.2 },
          { id: 'oxido_liquido', name: 'Oxidação por Líquido', description: 'Cobertura por líquido.', priceFactor: 0.1 },
        ],
      },
    ];
  }
}

export const store = new InMemoryStore();