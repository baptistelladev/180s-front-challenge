import { app } from '../src/app';

describe('Products', () => {
  it('GET /products deve retornar produtos com UUID e productType', async () => {
    const res = await app.request('/products');
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body.products)).toBe(true);
    const hasUUID = body.products.every((p: any) => typeof p.id === 'string' && p.id.length >= 30);
    const hasType = body.products.every((p: any) => ['residencial', 'vida', 'celular'].includes(p.productType));
    expect(hasUUID).toBe(true);
    expect(hasType).toBe(true);
  });
});