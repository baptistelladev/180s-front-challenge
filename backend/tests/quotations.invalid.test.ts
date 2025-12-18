import { app } from '../src/app';

describe('Validação - Quotation', () => {
  it('deve retornar 404 ao usar productId inexistente', async () => {
    const res = await app.request('/quotations', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        productId: '00000000-0000-0000-0000-000000000000',
        selectedCoverageIds: [],
        objectData: {
          brand: 'Apple',
          model: 'iPhone 13',
          imei: '351756110123456',
          purchaseDate: '2024-02-01',
          hasCase: true,
        },
      }),
    });
    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body.error).toBeDefined();
  });
});