import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { store } from '../data/store';
import { productsListResponseSchema } from '../schemas/out/products.schema';

export const productsRouter = new OpenAPIHono();

const listProductsRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['products'],
  responses: {
    200: {
      description: 'Lista de produtos',
      content: {
        'application/json': {
          schema: productsListResponseSchema,
        },
      },
    },
  },
});

productsRouter.openapi(listProductsRoute, (c) => {
  return c.json({ products: store.products });
});