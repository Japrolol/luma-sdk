import { Socket } from "socket.io-client";

export type AudioBinaryChunk = ArrayBuffer | Uint8Array | Buffer;

export type StartAudioPayload = {
  type: "audio.start";
  audioAction: "VOICE_MENTOR";
  meta: {
    sr: number;
    channels: number;
    format: "pcm_s16le";
  };
};

export type AudioChunkPayload = {
  type: "audio.chunk";
  meta: {
    seq: number;
    sr: number;
    samples: number;
    tsMs: number;
  };
};

export type AudioStopPayload = {
  type: "audio.stop";
};

export type MentorTextDeltaPayload = {
  type: "mentor.text.delta";
  jobId: string;
  seq: number;
  text: string;
};

export type MentorTextEndPayload = {
  type: "mentor.text.end";
  jobId: string;
  reason?: string;
};

export type MentorTextErrorPayload = {
  type: "mentor.text.error";
  jobId: string;
  code: string;
  message: string;
  retryable?: boolean;
};

export type ServerConnectedPayload = {
  sid: string;
  authenticated: boolean;
  sessionId: string;
};

export type LumaSocketListenEvents = {
  "server:connected": (payload: ServerConnectedPayload) => void;
  pong: (payload: unknown) => void;
  "audio:started": (payload: unknown) => void;
  "audio:chunked": (payload: unknown) => void;
  "audio:stopped": (payload: unknown) => void;
  "mentor:transcription": (payload: unknown) => void;
  "audio:output:chunk": (payload: unknown) => void;
  "audio:output:interrupted": (payload: unknown) => void;
  "audio:output:error": (payload: unknown) => void;
  "audio:output:complete": (payload: unknown) => void;
};

export type LumaSocketEmitEvents = {
  start_audio: (payload: StartAudioPayload) => void;
  audio_chunk: (payload: AudioChunkPayload, chunk: AudioBinaryChunk) => void;
  audio_stop: (payload: AudioStopPayload) => void;
  mentor_text_delta: (payload: MentorTextDeltaPayload) => void;
  mentor_text_end: (payload: MentorTextEndPayload) => void;
  mentor_text_error: (payload: MentorTextErrorPayload) => void;
  ping: (payload?: unknown) => void;
};

type LumaSocketBase = Socket<LumaSocketListenEvents, LumaSocketEmitEvents>;

export interface LumaSocket extends LumaSocketBase {
  startAudio(payload: StartAudioPayload): this;
  sendAudioChunk(payload: AudioChunkPayload, chunk: AudioBinaryChunk): this;
  stopAudio(payload?: AudioStopPayload): this;
  sendMentorTextDelta(payload: MentorTextDeltaPayload): this;
  sendMentorTextEnd(payload: MentorTextEndPayload): this;
  sendMentorTextError(payload: MentorTextErrorPayload): this;
  sendPing(payload?: unknown): this;

  onServerConnected(handler: LumaSocketListenEvents["server:connected"]): this;
  onAudioStarted(handler: LumaSocketListenEvents["audio:started"]): this;
  onAudioChunked(handler: LumaSocketListenEvents["audio:chunked"]): this;
  onAudioStopped(handler: LumaSocketListenEvents["audio:stopped"]): this;
  onMentorTranscription(handler: LumaSocketListenEvents["mentor:transcription"]): this;
  onAudioOutputChunk(handler: LumaSocketListenEvents["audio:output:chunk"]): this;
  onAudioOutputInterrupted(handler: LumaSocketListenEvents["audio:output:interrupted"]): this;
  onAudioOutputError(handler: LumaSocketListenEvents["audio:output:error"]): this;
  onAudioOutputComplete(handler: LumaSocketListenEvents["audio:output:complete"]): this;
}
