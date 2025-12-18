# API - Desafio 180 Seguros (Backend)

API em NodeJS + TypeScript para suportar a jornada de cotação (multi-step) e emissão de seguros. Não há banco de dados: os dados são mantidos em memória durante a execução do servidor.

## Stack
- Node 18+
- Express
- TypeScript
- Zod (validação)
- CORS habilitado
- Swagger UI (`/swagger`) + OpenAPI JSON (`/openapi.json`)

## Como rodar
1) No diretório `backend`:
```bash
pnpm install
pnpm dev
```
2) Servidor: `http://localhost:5000`

Opcional: variável de ambiente `PORT` para trocar a porta (ex.: `PORT=4000 pnpm dev`).

## Documentação interativa (Swagger)
- UI: acesse `http://localhost:5000/swagger`
- Especificação: `http://localhost:5000/openapi.json`

Você pode testar os endpoints diretamente pelo Swagger UI e exportar a especificação para ferramentas externas.

## Modelos de dados (resumo)
- Produto (`Product`):
  - `id` (UUID), `productType` (`residencial` | `vida` | `celular`), `name`, `description`, `basePremium`,
  - `coverages` (coberturas com `priceFactor`).
- Cotação (`Quotation`):
  - `id`, `productId` (UUID do produto), `selectedCoverageIds`, `objectData` (dados do objeto segurado),
  - `premiumBreakdown` (base, coverages, risk, total), `createdAt`.
- Apólice (`InsurancePolicy`):
  - `id`, `policyNumber`, `quotationId`, `productId` (UUID), `objectData`, `selectedCoverageIds`, `premiumTotal`,
  - `insured`, `startDate`, `endDate`, `createdAt`.

IDs gerados:
- Cotação: prefixo `qtc_...`
- Apólice: prefixo `pol_...`
- Número de apólice: prefixo `PN_...`

## Regras de precificação (simplificadas)
Total = basePremium + (basePremium × soma dos `priceFactor` das coberturas) + (basePremium × riskFactor)

O `riskFactor` depende do `productType`:
- `residencial`:
  - `constructionType = madeira` → +0.20
  - `constructionType = mista` → +0.10
  - `alvenaria` → +0.00
- `vida`:
  - `smoker = true` → +0.30
  - `hasChronicDisease = true` → +0.20
- `celular`:
  - Aparelhos com mais de 2 anos → +0.10
  - Aparelhos novos → −0.05
  - `hasCase = true` (usa capa) → −0.05 (mínimo acumulado −0.10)

## Erros e validação
- Validação via Zod. Em caso de erro de validação: HTTP 400 com formato:
```json
{
  "error": "VALIDATION_ERROR",
  "issues": { "fieldErrors": { "campo": ["mensagem..."] } }
}
```
- Recurso não encontrado: HTTP 404 `{ "error": "..." }`
- Erros inesperados: HTTP 500 `{ "error": "Erro interno do servidor" }`

## Endpoints

### GET /health
Check de saúde.

Exemplo de resposta:
```json
{ "status": "ok" }
```

---

### GET /products
Lista os produtos disponíveis com suas coberturas (para uso no front multi-step).

Exemplo de resposta (trecho):
```json
{
  "products": [
    {
      "id": "6f3b0d86-6d8e-44a1-9e9a-2f1f9b1f8f9a",
      "productType": "residencial",
      "name": "Seguro Residencial",
      "description": "Proteção para sua residência.",
      "basePremium": 100,
      "coverages": [
        { "id": "incendio", "name": "Incêndio", "priceFactor": 0.2 },
        { "id": "roubo", "name": "Roubo", "priceFactor": 0.15 }
      ]
    }
  ]
}
```

Curl:
```bash
curl -s http://localhost:5000/products | jq
```

---

### POST /quotations
Cria uma cotação para um produto específico, com seleção de coberturas e dados do objeto segurado.

Headers:
- `Content-Type: application/json`

Body comum:
- `productId`: UUID do produto (obtido em `GET /products`)
- `selectedCoverageIds`: string[]
- `objectData`: objeto cujos campos variam conforme o `productType` do produto escolhido

Validação por `productType`:
- Residencial (`objectData`):
  - `street` (string), `number` (string), `city` (string), `state` (string), `zip` (string)
  - `constructionType` (alvenaria|madeira|mista)
  - `areaM2` (number ≥ 0)
  - `yearBuilt` (number inteiro ≥ 1900)
- Vida (`objectData`):
  - `fullName` (string), `birthDate` (string ISO), `document` (CPF string),
  - `smoker` (boolean), `hasChronicDisease` (boolean)
- Celular (`objectData`):
  - `brand` (string), `model` (string), `imei` (string),
  - `purchaseDate` (string ISO), `hasCase` (boolean)

Exemplos de requisição (por produto):

Residencial:
```json
{
  "productId": "6f3b0d86-6d8e-44a1-9e9a-2f1f9b1f8f9a",
  "selectedCoverageIds": ["incendio", "roubo"],
  "objectData": {
    "street": "Rua A",
    "number": "100",
    "city": "São Paulo",
    "state": "SP",
    "zip": "01234-000",
    "constructionType": "alvenaria",
    "areaM2": 80,
    "yearBuilt": 2010
  }
}
```

Vida:
```json
{
  "productId": "b0d9a4f2-2c6e-4e36-8a62-6f0a9f2b3c1d",
  "selectedCoverageIds": ["morte", "invalidez"],
  "objectData": {
    "fullName": "Maria da Silva",
    "birthDate": "1990-05-10",
    "document": "12345678900",
    "smoker": false,
    "hasChronicDisease": true
  }
}
```

Celular:
```json
{
  "productId": "a4b7c9d1-8e2f-4f5a-b3c2-7182c1e4d5f6",
  "selectedCoverageIds": ["roubo_furto", "quebra_acidental"],
  "objectData": {
    "brand": "Apple",
    "model": "iPhone 13",
    "imei": "351756110123456",
    "purchaseDate": "2024-02-01",
    "hasCase": true
  }
}
```

Exemplo de resposta 201:
```json
{
  "quotation": {
    "id": "qtc_...",
    "productId": "6f3b0d86-6d8e-44a1-9e9a-2f1f9b1f8f9a",
    "selectedCoverageIds": ["incendio", "roubo"],
    "objectData": { "street": "Rua A", "constructionType": "alvenaria", "areaM2": 80, "yearBuilt": 2010 },
    "createdAt": "2025-08-08T12:29:45.986Z",
    "premiumBreakdown": {
      "base": 100,
      "coverages": 35,
      "risk": 0,
      "total": 135
    }
  }
}
```

Curl (residencial):
```bash
curl -s -X POST http://localhost:5000/quotations \
  -H 'Content-Type: application/json' \
  -d '{
    "productId":"6f3b0d86-6d8e-44a1-9e9a-2f1f9b1f8f9a",
    "selectedCoverageIds":["incendio","roubo"],
    "objectData":{
      "street":"Rua A","number":"100","city":"São Paulo","state":"SP","zip":"01234-000",
      "constructionType":"alvenaria","areaM2":80,"yearBuilt":2010
    }
  }' | jq
```

---

### GET /quotations
Lista todas as cotações criadas (em memória).

Exemplo de resposta:
```json
{
  "quotations": [
    {
      "id": "qtc_...",
      "productId": "6f3b0d86-6d8e-44a1-9e9a-2f1f9b1f8f9a",
      "selectedCoverageIds": ["incendio","roubo"],
      "objectData": { "street": "Rua A", "constructionType": "alvenaria" },
      "createdAt": "2025-08-08T12:29:45.986Z",
      "premiumBreakdown": { "base": 100, "coverages": 35, "risk": 0, "total": 135 }
    }
  ]
}
```

Curl:
```bash
curl -s http://localhost:5000/quotations | jq
```

---

### POST /insurances/issue
Emite uma apólice a partir de uma cotação existente. A vigência é de 1 ano a partir da emissão.

Headers:
- `Content-Type: application/json`

Body:
- `quotationId` (id retornado ao criar a cotação)
- `insured`: { `fullName`, `document` (CPF string), `email`, `phone` }

Exemplo de requisição:
```json
{
  "quotationId": "qtc_ef935206-c6d4-46f9-9fb7-f87a9752fcf6",
  "insured": {
    "fullName": "Fulano de Tal",
    "document": "00000000000",
    "email": "fulano@example.com",
    "phone": "+55 11 99999-0000"
  }
}
```

Exemplo de resposta 201:
```json
{
  "insurance": {
    "id": "pol_...",
    "policyNumber": "PN_...",
    "quotationId": "qtc_...",
    "productId": "6f3b0d86-6d8e-44a1-9e9a-2f1f9b1f8f9a",
    "objectData": { "street": "Rua A", "constructionType": "alvenaria" },
    "selectedCoverageIds": ["incendio","roubo"],
    "premiumTotal": 135,
    "insured": {
      "fullName": "Fulano de Tal",
      "document": "00000000000",
      "email": "fulano@example.com",
      "phone": "+55 11 99999-0000"
    },
    "startDate": "2025-08-08T12:30:04.150Z",
    "endDate": "2026-08-08T12:30:04.150Z",
    "createdAt": "2025-08-08T12:30:04.150Z"
  }
}
```

Curl:
```bash
curl -s -X POST http://localhost:5000/insurances/issue \
  -H 'Content-Type: application/json' \
  -d '{
    "quotationId":"qtc_...",
    "insured":{"fullName":"Fulano de Tal","document":"00000000000","email":"fulano@example.com","phone":"+55 11 99999-0000"}
  }' | jq
```

---

### GET /insurances
Lista as apólices emitidas (em memória).

Exemplo de resposta:
```json
{
  "insurances": [
    {
      "id": "pol_...",
      "policyNumber": "PN_...",
      "quotationId": "qtc_...",
      "productId": "6f3b0d86-6d8e-44a1-9e9a-2f1f9b1f8f9a",
      "objectData": { "street": "Rua A" },
      "selectedCoverageIds": ["incendio","roubo"],
      "premiumTotal": 135,
      "insured": { "fullName": "Fulano de Tal", "document": "00000000000", "email": "fulano@example.com", "phone": "+55 11 99999-0000" },
      "startDate": "2025-08-08T12:30:04.150Z",
      "endDate": "2026-08-08T12:30:04.150Z",
      "createdAt": "2025-08-08T12:30:04.150Z"
    }
  ]
}
```

Curl:
```bash
curl -s http://localhost:5000/insurances | jq
```

## Observações importantes
- Todos os dados ficam apenas em memória; reiniciar o servidor apaga cotações e apólices.
- Use `GET /products` para obter o `id` (UUID) e o `productType` do produto para guiar o fluxo de UI e a validação dos campos.
- Envie sempre o `productId` (UUID) no `POST /quotations` e utilize a `quotationId` retornada para emitir em `POST /insurances/issue`.