# Luma SDK

TypeScript SDK for the Luma platform used by Mentingo.

It provides two separate clients:
- HTTP client for public API operations (drafts, ingestion, chat, assets)
- Socket client for realtime audio/voice mentor flows

## Installation

```bash
pnpm add @japro/luma-sdk
# or
npm install @japro/luma-sdk
# or
yarn add @japro/luma-sdk
```

## Quick Start (HTTP)

```ts
import { createLumaClient } from "@japro/luma-sdk";

const client = createLumaClient({
  baseURL: "https://your-luma-api.example.com",
  apiKey: process.env.LUMA_API_KEY,
});

const draft = await client.createDraft({
  integrationId: "course-123",
  draftName: "Cybersecurity Fundamentals",
  courseLanguage: "en",
});
```

## Quick Start (Socket)

```ts
import { createLumaSocket } from "@japro/luma-sdk";

const socket = createLumaSocket({
  baseURL: "https://your-luma-api.example.com",
  apiKey: process.env.LUMA_API_KEY,
  socketData: {
    sessionId: "session-123",
    userId: "user-123",
    lessonId: "lesson-123",
  },
});

socket
  .onServerConnected((payload) => console.log("connected", payload))
  .onMentorTranscription((payload) => console.log("transcription", payload))
  .onAudioOutputChunk((payload) => console.log("audio chunk", payload));

socket.connect();

socket.startAudio({
  type: "audio.start",
  audioAction: "VOICE_MENTOR",
  meta: { sr: 16000, channels: 1, format: "pcm_s16le" },
});

socket.sendAudioChunk(
  {
    type: "audio.chunk",
    meta: { seq: 1, sr: 16000, samples: 320, tsMs: Date.now() },
  },
  new Uint8Array([0, 1, 2]),
);

socket.stopAudio();
```

## HTTP Client API

### `createLumaClient(opts)`

Options:
- `baseURL?: string` - Luma API base URL.
- `apiKey?: string` - API key sent as `X-API-Key`.
- `httpsAgent?: Agent` - custom Node.js HTTPS agent.
- `allowInsecureTls?: boolean` - if `true`, uses `rejectUnauthorized: false` (dev only).

Methods:
- `chat(opts)`
- `createDraft(opts)`
- `ingestDraftFile(opts)`
- `deleteIngestedDocument(opts)`
- `getDraftFiles(opts)`
- `getDraft(opts)`
- `getDraftMessages(opts)`
- `getGeneratedCourse(opts)`
- `deleteDraft(opts)`
- `getAssets(opts)`

## Socket Client API

### `createLumaSocket(opts)`

Options:
- `baseURL?: string`
- `apiKey?: string`
- `allowInsecureTls?: boolean`
- `socketData?: { sessionId?: string; userId?: string; lessonId?: string }`

Emit helpers:
- `startAudio(payload)` -> emits `start_audio`
- `sendAudioChunk(payload, chunk)` -> emits `audio_chunk`
- `stopAudio(payload?)` -> emits `audio_stop`
- `sendMentorTextDelta(payload)` -> emits `mentor_text_delta`
- `sendMentorTextEnd(payload)` -> emits `mentor_text_end`
- `sendMentorTextError(payload)` -> emits `mentor_text_error`
- `sendPing(payload?)` -> emits `ping`

Listener helpers:
- `onServerConnected(handler)` -> listens `server:connected`
- `onAudioStarted(handler)` -> listens `audio:started`
- `onAudioChunked(handler)` -> listens `audio:chunked`
- `onAudioStopped(handler)` -> listens `audio:stopped`
- `onMentorTranscription(handler)` -> listens `mentor:transcription`
- `onAudioOutputChunk(handler)` -> listens `audio:output:chunk`
- `onAudioOutputInterrupted(handler)` -> listens `audio:output:interrupted`
- `onAudioOutputError(handler)` -> listens `audio:output:error`
- `onAudioOutputComplete(handler)` -> listens `audio:output:complete`

## Public Exports

- HTTP: `createLumaClient`, `LumaClient`, `LumaClientOptions`
- Socket: `createLumaSocket`, `LumaSocket`, socket payload/event types from `src/socket/types.ts`
- Shared API/domain types from `src/types.ts`

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

Uses `src/api/api-schema-public.json` to regenerate `src/api/generated-api.ts`.

## Notes

- Built with `tsup` and ships ESM + CJS.
- HTTP auth uses the `X-API-Key` header.
- Keep API keys out of source control.
