import { app } from '../src/app';

function pickFirstProductByType(products: any[], type: string) {
  return products.find((p) => p.productType === type);
}

describe('Jornada - Vida', () => {
  it('Cria cotação de vida e emite apólice', async () => {
    const productsRes = await app.request('/products');
    const productsBody = await productsRes.json();
    const vida = pickFirstProductByType(productsBody.products, 'vida');
    expect(vida).toBeTruthy();

    const quotationRes = await app.request('/quotations', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        productId: vida.id,
        selectedCoverageIds: ['morte', 'invalidez'],
        objectData: {
          fullName: 'Maria da Silva',
          birthDate: '1990-05-10',
          document: '12345678900',
          smoker: false,
          hasChronicDisease: true,
        },
      }),
    });
    expect(quotationRes.status).toBe(201);
    const quotationBody = await quotationRes.json();

    const issueRes = await app.request('/insurances/issue', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        quotationId: quotationBody.quotation.id,
        insured: {
          fullName: 'Maria da Silva',
          document: '12345678900',
          email: 'maria@example.com',
          phone: '+55 11 98888-0000',
        },
      }),
    });
    expect(issueRes.status).toBe(201);
  });
});