# Course authoring SDK architecture

## Generated task-kind contract alignment — 2026-10-02

The public producer schema includes `course_review` for the assembled-course
review stage. A locally linked SDK with an older generated enum caused Core to
reject an otherwise valid completed session snapshot with a 502 response.
The public schema was copied from Mentingo AI's current exported schema, the
client regenerated through `generate:client`, and SDK distributions rebuilt.
No response validation was relaxed. A regression checks the built task-kind
enum, and all 42 SDK tests plus consumer type checks pass. Core's actual saved
snapshot validates against the rebuilt SDK; its proxy regression covers review
tasks and rejection of unknown kinds. Other environments require a released
SDK version carrying these generated contracts; this local change is not a
package publication.

The SDK transports authoring commands, snapshots, events and frozen application bundles between Core and Luma. It does not own the authoring graph, durable job queue, permission decisions or Core's database transaction.

## Modules

| Module                                                        | Responsibility                                                                                |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [`http/authoring.ts`](../src/http/authoring.ts)               | Typed facade for sessions, commands, sources, asset download, exports and receipts            |
| [`http/authoring.stream.ts`](../src/http/authoring.stream.ts) | Bounded SSE decoding, envelope validation and stream cleanup                                  |
| [`http/authoring.types.ts`](../src/http/authoring.types.ts)   | Generated-contract aliases, stricter Mentor creation input, subscription and download options |
| [`http/client.ts`](../src/http/client.ts)                     | Constructs the authoring facade with the existing authenticated generated client              |
| [`api/generated-api.ts`](../src/api/generated-api.ts)         | Generated HTTP routes and wire types; regenerate from Luma OpenAPI rather than editing        |
| [`contracts.ts`](../src/contracts.ts)                         | Public contract export surface for consumers that need types without constructing a client    |

## Command and application flow

Core authenticates the editor, loads trusted course context and forwards an authoring command with a stable command ID. `sendCommand` returns Luma's acknowledgement. Luma workers complete generation separately; the SDK does not interpret acknowledgement as task success.

After author review, `prepareExport` requests a frozen selection. Core can retrieve the same export, stage its assets through bounded downloads, apply its selected operations transactionally and deliver the resulting receipt through `recordReceipt`. Export identity and application idempotency are enforced by the respective servers, not an SDK memory cache.

Callers must preserve command identities when retrying the same request and must not reuse an identity for a different payload. Asset downloads default to 32 MiB; Core should pass the manifest byte size for the particular asset. Download limits do not verify content hashes or grant permission to use the image.

## Events and reconnection

`subscribeEvents` opens one server-sent event connection. It supports Node async iterable responses and browser readable streams. The parser handles split UTF-8 chunks, validates the event's session and SSE sequence metadata, bounds each frame and rejects incomplete trailing data.

The caller owns its durable cursor, duplicate/gap handling and reconnect policy. The SDK does not silently reconnect or skip events. `permission_revoked` and `history_expired` are terminal typed conditions; consumers must resolve access or reload a snapshot as appropriate. An abort closes the subscription; it does not stop server generation.

Core receives the Luma stream and forwards authorized updates to browser Socket.IO rooms. This SSE transport is separate from the SDK's existing legacy Socket.IO features.

## Validation and release boundary

The authoring test suite covers deterministic HTTP transport, response limits, SSE parsing and compatibility. Consumer TypeScript checks exercise the published API shape, including Mentor creation requirements and source-refresh input. These do not prove deployed proxy buffering, browser reconnection, provider execution or the complete Core/Luma workflow.

The feature is currently integrated through a local SDK link. Publishing and replacing that link with the agreed released package remain release work; no release is implied by a local build passing.

## Reasoning control transport

The SDK carries `AuthoringRequest.reasoningEffort` (`low`, `medium`, `high`) unchanged in `request.create` commands. `SessionSnapshot.reasoningControlAvailable` tells Core whether its first-party reasoning selector is applicable. Both fields are generated from Luma's public OpenAPI schema; the SDK does not infer availability from a model name or alter `sourcePolicy.researchDepth`. Consumer typing and a recorded HTTP command test cover the boundary. The actual Responses API option is applied only by Luma's first-party provider adapter, outside this SDK.

## Targeted regeneration feedback

`proposal.regenerate` may carry `feedback` alongside its proposal ID and expected revision. The SDK forwards this bounded author text unchanged; Luma validates that it is nonblank, applies it only to the requested regeneration, and preserves the proposal's existing scope and protected edits. Consumer typing and a recorded HTTP command test cover the transport. The SDK does not interpret the feedback or start a new authoring request.
