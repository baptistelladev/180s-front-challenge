import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { store } from '../data/store';
import { generateId } from '../utils/id';
import { InsurancePolicy, IssueInsuranceInput } from '../models';
import { issueInsuranceSchema } from '../schemas/in/insurance.schema';
import { insuranceIssueResponseSchema, insurancesListResponseSchema } from '../schemas/out/insurances.schema';

export const insurancesRouter = new OpenAPIHono();

const issueRoute = createRoute({
  method: 'post',
  path: '/issue',
  tags: ['insurances'],
  request: {
    body: {
      content: { 'application/json': { schema: issueInsuranceSchema } },
      required: true,
    },
  },
  responses: {
    201: { description: 'Apólice emitida', content: { 'application/json': { schema: insuranceIssueResponseSchema } } },
    404: { description: 'Não encontrado', content: { 'application/json': { schema: z.object({ error: z.string() }) } } },
  },
});

insurancesRouter.openapi(issueRoute, (c) => {
  const parsed = c.req.valid('json') as IssueInsuranceInput;

  const quotation = store.quotations.get(parsed.quotationId);
  if (!quotation) return c.json({ error: 'Cotação não encontrada' }, 404);

  const product = store.products.find((p) => p.id === quotation.productId);
  if (!product) return c.json({ error: 'Produto não encontrado para esta cotação' }, 404);

  const id = generateId('pol');
  const policyNumber = generateId('PN');

  const start = new Date();
  const end = new Date(start);
  end.setFullYear(start.getFullYear() + 1);

  const policy: InsurancePolicy = {
    id,
    policyNumber,
    quotationId: quotation.id,
    productId: quotation.productId,
    objectData: quotation.objectData,
    selectedCoverageIds: quotation.selectedCoverageIds,
    premiumTotal: quotation.premiumBreakdown.total,
    insured: parsed.insured,
    startDate: start.toISOString(),
    endDate: end.toISOString(),
    createdAt: new Date().toISOString(),
  };

  store.insurances.set(id, policy);

  return c.json({ insurance: policy }, 201);
});

const listInsurancesRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['insurances'],
  responses: {
    200: { description: 'Lista de apólices', content: { 'application/json': { schema: insurancesListResponseSchema } } },
  },
});

insurancesRouter.openapi(listInsurancesRoute, (c) => {
  const insurances = Array.from(store.insurances.values());
  return c.json({ insurances });
});