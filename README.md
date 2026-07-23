# Luma SDK

TypeScript SDK for the Luma platform used by Mentingo.

It provides two separate clients:

- HTTP client for public API operations (drafts, ingestion, chat, assets, configuration)
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

const draft = await client.courses.createDraft({
  integrationId: "course-123",
  draftName: "Cybersecurity Fundamentals",
  courseLanguage: "en",
});

await client.courses.chat({
  integrationId: draft.integrationId,
  message: "Generate a short course for new security analysts.",
});
```

## Quick Start (Socket)

```ts
import {
  createLumaSocket,
  LUMA_AUDIO_ACTIONS,
  LUMA_AUDIO_FORMATS,
  LUMA_SOCKET_MESSAGE_TYPES,
} from "@japro/luma-sdk";

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
  type: LUMA_SOCKET_MESSAGE_TYPES.AUDIO_START,
  audioAction: LUMA_AUDIO_ACTIONS.VOICE_MENTOR,
  meta: { sr: 16000, channels: 1, format: LUMA_AUDIO_FORMATS.PCM_S16LE },
});

socket.sendAudioChunk(
  {
    type: LUMA_SOCKET_MESSAGE_TYPES.AUDIO_CHUNK,
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

Namespaces:

- `client.courses.chat(opts)` - stream the public course-generation chat endpoint.
- `client.courses.createDraft(opts)`
- `client.courses.ingestFile(opts)`
- `client.courses.deleteIngestedDocument(opts)`
- `client.courses.getDraftFiles(opts)`
- `client.courses.getDraft(opts)`
- `client.courses.getDraftMessages(opts)`
- `client.courses.getGeneratedCourse(opts)`
- `client.courses.getGeneratedCourseBundle(opts)`
- `client.courses.getAssets(opts)`
- `client.courses.deleteDraft(opts)`
- `client.mentor.streamChat(opts)` - stream mentor chat through the public custom-runtime endpoint. Pass `voiceSessionId` for voice mentor sessions so Luma can forward mentor text directly to the voice session.
- `client.mentor.chat(opts)` - alias for `client.mentor.streamChat(opts)`.
- `client.mentor.generateChat(opts)` - generate a non-stream mentor chat response.
- `client.mentor.judge(opts)`
- `client.ai.createEmbeddings(opts)`
- `client.ai.generateJudgeConfiguration(opts)`
- `client.ai.validateJudgeConfiguration(opts)`
- `client.ai.generateTranslations(opts)`
- `client.ai.transcribeDictation(opts)`
- `client.configuration.get()`

The HTTP client intentionally exposes public API operations through namespaces
instead of flat top-level methods.

## Runtime Configuration

Use `client.configuration.get()` to inspect which public AI capabilities are enabled
for the API key. The SDK exports `AiCapability`, `AiCapabilityMode`,
`AiCapabilityProvider`, `AiRuntimeConfiguration`, and convenience constants such as
`LUMA_AI_CAPABILITIES` and `LUMA_AI_CAPABILITY_MODES`.

Custom model names should use the backend `provider:model` format, for example
`openai:gpt-4.1-mini` or `ollama:llama3.1`.

For voice mentor flows, use `client.mentor.streamChat({ ..., voiceSessionId })` so streamed mentor text can be forwarded to the active socket session without a separate polling or relay step. Use `client.mentor.generateChat(opts)` only for normal one-shot text responses.

## Course Generation Completion

Luma emits `course.generated` when the final generated course artifact is ready to fetch. After this event, callers should fetch the final course and ready generated assets:

```ts
import {
  createLumaClient,
  isLumaCourseGeneratedEvent,
  LUMA_COURSE_GENERATION_STREAM_EVENT_TYPES,
} from "@japro/luma-sdk";

const client = createLumaClient({ baseURL, apiKey });

if (isLumaCourseGeneratedEvent(event)) {
  const { course, assets } = await client.courses.getGeneratedCourseBundle({
    integrationId: "course-123",
  });
}

console.log(LUMA_COURSE_GENERATION_STREAM_EVENT_TYPES.COURSE_GENERATED);
```

Progress streams may also include `designer.chapter.generated`, `architect.lesson.generated`, and `asset.requested`. These are preview/progress events; `course.generated` is the final artifact-ready event.

Ready generated assets are referenced in the final course HTML as import markers:

```html
<div data-node-type="luma-asset" data-asset-id="<asset_id>"></div>
```

These markers are not renderable UI. Consumers should map `data-asset-id` to `assetId` from `getAssets` or `getGeneratedCourseBundle`, copy/import the signed URL into their own storage, and replace the marker with their native resource node. Signed URLs are temporary and should not be stored durably.

`loading-ai-asset` nodes are preview-only placeholders and should not appear in the final generated course. FillInTheBlanks and GapFill content can contain `<blank-answer-<id>>` tags; matching quiz options expose `blankAnswerId` and consumers should preserve that value during import.

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

- HTTP: `createLumaClient`, `LumaClient`, `LumaClientOptions`, namespaced HTTP clients
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
