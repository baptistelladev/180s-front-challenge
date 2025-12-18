import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { store } from '../data/store';
import { generateId } from '../utils/id';
import { calculatePremium } from '../services/pricing';
import { ProductType, Quotation, QuotationInput } from '../models';
import { baseSchema, objectDataSchemas } from '../schemas/in/quotations.schema';
import { quotationCreateResponseSchema, quotationsListResponseSchema } from '../schemas/out/quotations.schema';

export const quotationsRouter = new OpenAPIHono();

function validateObjectData(productType: ProductType, objectData: Record<string, unknown>) {
  const schema = objectDataSchemas[productType];
  return schema ? schema.parse(objectData) : objectData;
}

const createQuotationRoute = createRoute({
  method: 'post',
  path: '/',
  tags: ['quotations'],
  request: {
    body: {
      content: {
        'application/json': { schema: baseSchema },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'Cotação criada',
      content: { 'application/json': { schema: quotationCreateResponseSchema } },
    },
    404: {
      description: 'Produto não encontrado',
      content: { 'application/json': { schema: z.object({ error: z.string() }) } },
    },
  },
});

quotationsRouter.openapi(createQuotationRoute, async (c) => {
  const parsed = c.req.valid('json') as QuotationInput;

  const product = store.products.find((p) => p.id === parsed.productId);
  if (!product) return c.json({ error: 'Produto não encontrado' }, 404);

  const objectData = validateObjectData(
    product.productType,
    parsed.objectData as Record<string, unknown>
  );

  const premiumBreakdown = calculatePremium(product, { ...parsed, objectData });

  const id = generateId('qtc');
  const quotation: Quotation = {
    id,
    productId: parsed.productId,
    selectedCoverageIds: parsed.selectedCoverageIds,
    objectData,
    createdAt: new Date().toISOString(),
    premiumBreakdown,
  };

  store.quotations.set(id, quotation);

  return c.json({ quotation }, 201);
});

const listQuotationRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['quotations'],
  responses: {
    200: {
      description: 'Lista de cotações',
      content: { 'application/json': { schema: quotationsListResponseSchema } },
    },
  },
});

quotationsRouter.openapi(listQuotationRoute, (c) => {
  const quotations = Array.from(store.quotations.values());
  return c.json({ quotations });
});