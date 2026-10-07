# Course authoring — deferred SDK integration

Status: implementation in progress, 2026-09-16. Branch `jh_feat_1971_course_authoring_refactor` from fetched origin/main `92080c2` (package 0.2.23). The quiz-PR Core base pins 0.2.15; development currently links this SDK checkout locally.

Root coordinates the integration. The SDK agent completed the initial producer/consumer integration and root now owns subsequent contract updates. Do not publish or merge before integration gates pass; regenerate generated types through the existing script.

Read Core `docs/plans/course-authoring-refactor-implementation.md`, `course-authoring-core-plan.md`, and AI `docs/implementation/course-authoring-ai-plan.md` for full scope. All agreed features remain; V1 has usage/cost tracking, no credit limits or budget enforcement.

## Readiness checklist

- [ ] Both leads approve versioned commands, session snapshots, cursor replay/event envelopes, artifact/source/asset schemas, discriminated proposal operations, frozen exports and apply receipts.
- [ ] Every quiz variant uses the new assessment contract; AI Mentor content/private configuration/judge fields are distinct.
- [ ] Idempotency, auth binding, content language, error categories and cursor expiry behavior have shared fixtures.
- [ ] Luma exports actual public OpenAPI; SDK ingests that artifact, generates client with existing `pnpm generate:client`, then updates public wrappers/types/exports intentionally.
- [ ] Avoid generating arbitrary hand-maintained copies of Core models in SDK. Wire DTOs remain cross-system authoring contracts, Core owns persistence mapping.
- [ ] Preserve existing legacy draft/chat/bundle interface during transition and existing voice socket behavior.
- [ ] Add shared contract fixtures, invalid-version/error handling, duplicate/reconnect and consumer compile tests; use `pnpm test` and `pnpm lint`.
- [ ] Validate Core against the candidate SDK without prematurely publishing; then document compatible package version and deployment order. Update Core dependency through normal package manager workflow.
- [ ] Repository leads/root review boundary changes before merge. External publication/push/merge are separate actions, not implied by this planning file.

## Implemented SDK boundary

The SDK now generates from the exported Luma public OpenAPI and exposes the seven available
authoring operations through `client.authoring`: session creation/read, cursor event reads,
commands, frozen export preparation/read, and application receipt recording. Request bodies are
forwarded unchanged, including caller-owned command IDs, and command/export methods do not retry
automatically. Session snapshots keep their required `courseId`; frozen exports remain distinct
from the legacy mutable generated-course bundle.

The public type aliases include task summaries, workspace records, event pages, operations,
receipts, and frozen exports. Mentor lesson creation is narrowed at the SDK boundary so its judge
configuration cannot be omitted or null. This guards the Core creation contract even though the
generated wire schema currently permits null for the model shared with updates.

The generated client also exposes source upload as multipart `file` plus caller-owned `commandId`,
and authenticated revision-bound asset download as bytes. Asset manifests carry stable revision,
SHA-256, MIME type and byte size rather than expiring download URLs. Source selection remains the
separate `sources.select` authoring command.

`client.authoring.subscribeEvents` consumes the authenticated SSE stream from the agreed
`events/stream` endpoint. It forwards the durable cursor, ignores heartbeat comments, checks the
SSE ID against each event sequence, and delivers events serially. `history_expired` and
`permission_revoked` invoke the terminal callback when supplied and then reject with a typed error.
The SDK validates schema version, session binding and positive safe sequence numbers, bounds frame
size, rejects truncated frames, closes the stream on terminal/error paths, forwards `AbortSignal`,
and never reconnects automatically. The Core gateway owns snapshot/replay and reconnect policy.

Validation covers exact HTTP paths, organization API-key auth, course binding, cursor forwarding,
command ID/body preservation, frozen export transport, receipt transport, error propagation and
the no-retry boundary. Core consumer validation must use the locally built package before release.

## Legacy voice compatibility

The quiz-PR Core base still uses `onMentorTranscription`. A deprecated SDK adapter maps it to the current `learner:transcription` event and forwards final transcripts only, preserving the old consumer behavior. The modern listener continues receiving partial and final transcripts. A network-free socket test verifies both listeners against the same events; no Core voice workflow was rewritten for authoring. Root validation passed build, consumer typing, all 33 SDK tests and lint.

## Current authoring additions

Generated contracts now include explicit educational-concern acknowledgment, Mentor material operation/source/section bindings, and deterministic lesson displayOrder. Asset downloads accept maxBytes; the Node HTTP adapter enforces the response limit while reading, with an additional returned-byte check. Callers should use the verified frozen manifest byteSize. The default is 32 MiB. Build, consumer types and 34 tests passed after these changes.
