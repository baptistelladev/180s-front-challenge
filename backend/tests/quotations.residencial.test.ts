import { app } from '../src/app';

function pickFirstProductByType(products: any[], type: string) {
  return products.find((p) => p.productType === type);
}

describe('Jornada - Residencial', () => {
  it('Cria cotação, lista e emite apólice', async () => {
    const productsRes = await app.request('/products');
    const productsBody = await productsRes.json();
    const residencial = pickFirstProductByType(productsBody.products, 'residencial');
    expect(residencial).toBeTruthy();

    const quotationRes = await app.request('/quotations', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        productId: residencial.id,
        selectedCoverageIds: ['incendio', 'roubo'],
        objectData: {
          street: 'Rua A',
          number: '100',
          city: 'São Paulo',
          state: 'SP',
          zip: '01234-000',
          constructionType: 'alvenaria',
          areaM2: 80,
          yearBuilt: 2010,
        },
      }),
    });
    expect(quotationRes.status).toBe(201);
    const quotationBody = await quotationRes.json();
    const quotationId = quotationBody.quotation.id;

    const listRes = await app.request('/quotations');
    expect(listRes.status).toBe(200);
    const listBody = await listRes.json();
    expect(listBody.quotations.length).toBeGreaterThan(0);

    const issueRes = await app.request('/insurances/issue', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        quotationId,
        insured: {
          fullName: 'Fulano de Tal',
          document: '00000000000',
          email: 'fulano@example.com',
          phone: '+55 11 99999-0000',
        },
      }),
    });
    expect(issueRes.status).toBe(201);
    const issueBody = await issueRes.json();
    expect(issueBody.insurance.quotationId).toBe(quotationId);

    const listIns = await app.request('/insurances');
    expect(listIns.status).toBe(200);
    const listInsBody = await listIns.json();
    expect(listInsBody.insurances.length).toBeGreaterThan(0);
  });
});