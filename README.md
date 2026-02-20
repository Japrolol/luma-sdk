# Luma SDK

TypeScript SDK for the Luma agentic platform used by Mentingo.  
This SDK wraps Luma's public API for multi-agent draft creation, ingestion, chat, and generated course retrieval.

## Installation

```bash
pnpm add @japro/luma-sdk
# or
npm install @japro/luma-sdk
# or
yarn add @japro/luma-sdk
```

## Quick Start

```ts
import { createLumaClient } from "@japro/luma-sdk";

const client = createLumaClient({
  baseURL: "https://your-luma-api.example.com",
  apiKey: process.env.LUMA_API_KEY,
});
```

## Client Options

- `baseURL?: string` - Luma API base URL.
- `apiKey?: string` - API key sent as `X-API-Key`.
- `httpsAgent?: Agent` - custom Node.js HTTPS agent.
- `allowInsecureTls?: boolean` - if `true`, creates an HTTPS agent with `rejectUnauthorized: false` (use only in local/dev environments).

## Core API

### 1) Create a draft

```ts
const draft = await client.createDraft({
  integrationId: "course-123",
  draftName: "Cybersecurity Fundamentals",
});

console.log(draft.draftId);
```

### 2) Ingest a file into a draft

```ts
const file = new File(["file-content"], "source.txt", { type: "text/plain" });

const ingestResult = await client.ingestDraftFile({
  integrationId: "course-123",
  file,
});

console.log(ingestResult.success, ingestResult.jobId);
```

### 3) Chat with the draft context

```ts
const response = await client.chat({
  integrationId: "course-123",
  message: "Build a 5-module beginner learning path",
});

console.log(response.data);
```

### 4) Read draft artifacts

```ts
const status = await client.getDraft({ integrationId: "course-123" });
const files = await client.getDraftFiles({ integrationId: "course-123" });
const messages = await client.getDraftMessages({ integrationId: "course-123" });
const course = await client.getGeneratedCourse({ integrationId: "course-123" });
```

### 5) Delete ingested documents

```ts
await client.deleteIngestedDocument({
  integrationId: "course-123",
  documentId: "doc-uuid",
});
```

## Exports

- `createLumaClient(opts)`
- `LumaClient`
- All SDK types from `src/types.ts`

## Development

```bash
pnpm install
pnpm build
pnpm lint
```

### Regenerate API client from OpenAPI schema

```bash
pnpm generate:client
```

This uses `src/api/api-schema-public.json` to regenerate `src/api/generated-api.ts`.

## Notes

- The SDK is built with `tsup` and ships both ESM and CJS outputs.
- API calls are authenticated with the `X-API-Key` header.
- `chat(...)` returns the underlying HTTP response from the generated API client.
- Keep API keys out of source control and prefer environment variables.
