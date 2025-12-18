import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { timing } from 'hono/timing';
import { productsRouter } from './routes/products';
import { quotationsRouter } from './routes/quotations';
import { insurancesRouter } from './routes/insurances';

export const app = new OpenAPIHono();

app.use('*', logger());
app.use('*', timing());
app.use('*', cors());

app.get('/health', (c) => c.json({ status: 'ok' }));
app.get('/', (c) => c.redirect('/swagger', 302));
app.doc('/openapi.json', {
  openapi: '3.0.0',
  info: {
    title: '180 Seguros - API de Cotações e Seguros',
    version: '1.0.0',
    description:
      'API para jornada de cotação e emissão de seguros. Dados em memória. productId é UUID e productType indica o tipo do produto.',
  },
});
app.get('/swagger', swaggerUI({ url: '/openapi.json' }));


app.route('/products', productsRouter);
app.route('/quotations', quotationsRouter);
app.route('/insurances', insurancesRouter);

app.onError((err, c) => {
  // eslint-disable-next-line no-console
  console.error('[onError]', err);
  return c.json({ error: 'INTERNAL_ERROR' }, 500);
});

app.notFound((c) => c.json({ error: 'NOT_FOUND' }, 404));