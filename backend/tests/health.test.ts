import { app } from '../src/app';

describe('Health', () => {
  it('GET /health deve responder ok', async () => {
    const res = await app.request('/health');
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ status: 'ok' });
  });
});