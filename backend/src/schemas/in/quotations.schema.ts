import { z } from '@hono/zod-openapi';

export const residencialSchema = z.object({
    street: z.string().min(1, "Rua é obrigatória"),
    number: z.string().min(1, "Número é obrigatório"),
    city: z.string().min(1, "Cidade é obrigatória"),
    state: z.string().min(1, "Estado é obrigatório"),
    zip: z.string().min(1, "CEP é obrigatório"),
    constructionType: z.enum(['alvenaria', 'madeira', 'mista'], {
      errorMap: () => ({ message: "Tipo de construção deve ser alvenaria, madeira ou mista" })
    }),
    areaM2: z.number().nonnegative("Área deve ser um valor não negativo"),
    yearBuilt: z.number().int("Ano de construção deve ser um número inteiro").min(1900, "Ano de construção deve ser após 1900"),
});
  
export const vidaSchema = z.object({
    fullName: z.string().min(1, "Nome completo é obrigatório"),
    birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
    document: z.string().min(11, "Documento deve ter pelo menos 11 caracteres"),
    smoker: z.boolean({
      invalid_type_error: "Campo fumante deve ser verdadeiro ou falso"
    }),
    hasChronicDisease: z.boolean({
      invalid_type_error: "Campo doença crônica deve ser verdadeiro ou falso"
    }),
});
  
export const celularSchema = z.object({
    brand: z.string().min(1, "Marca é obrigatória"),
    model: z.string().min(1, "Modelo é obrigatório"),
    imei: z.string().min(5, "IMEI deve ter pelo menos 5 caracteres"),
    purchaseDate: z.string().min(1, "Data de compra é obrigatória"),
    hasCase: z.boolean({
      invalid_type_error: "Campo possui capa deve ser verdadeiro ou falso"
    }),
});

export const baseSchema = z.object({
    productId: z.string().uuid("ID do produto deve ser um UUID válido"),
    selectedCoverageIds: z.array(z.string()).min(0, "Lista de coberturas selecionadas é obrigatória"),
    objectData: z.union([residencialSchema, vidaSchema, celularSchema], { message: "Dados do objeto devem ser fornecidos" }),
});

export const objectDataSchemas = {
  residencial: residencialSchema,
  vida: vidaSchema,
  celular: celularSchema,
} as const;