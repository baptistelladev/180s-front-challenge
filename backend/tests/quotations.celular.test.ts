import { app } from '../src/app';

function pickFirstProductByType(products: any[], type: string) {
  return products.find((p) => p.productType === type);
}

describe('Jornada - Celular', () => {
  it('Cria cotação de celular e emite apólice', async () => {
    const productsRes = await app.request('/products');
    const productsBody = await productsRes.json();
    const celular = pickFirstProductByType(productsBody.products, 'celular');
    expect(celular).toBeTruthy();

    const quotationRes = await app.request('/quotations', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        productId: celular.id,
        selectedCoverageIds: ['roubo_furto', 'quebra_acidental'],
        objectData: {
          brand: 'Apple',
          model: 'iPhone 13',
          imei: '351756110123456',
          purchaseDate: '2024-02-01',
          hasCase: true,
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
          fullName: 'João Souza',
          document: '98765432100',
          email: 'joao@example.com',
          phone: '+55 11 97777-0000',
        },
      }),
    });
    expect(issueRes.status).toBe(201);
  });
});