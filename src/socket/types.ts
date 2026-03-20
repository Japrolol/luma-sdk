import { Socket } from "socket.io-client";

export const LUMA_SOCKET_MESSAGE_TYPES = {
  AUDIO_START: "audio.start",
  AUDIO_CHUNK: "audio.chunk",
  AUDIO_STOP: "audio.stop",
  MENTOR_TEXT_DELTA: "mentor.text.delta",
  MENTOR_TEXT_END: "mentor.text.end",
  MENTOR_TEXT_ERROR: "mentor.text.error",
} as const;

export const LUMA_AUDIO_ACTIONS = {
  VOICE_MENTOR: "VOICE_MENTOR",
} as const;

export const LUMA_AUDIO_FORMATS = {
  PCM_S16LE: "pcm_s16le",
} as const;

export const LUMA_SOCKET_LISTEN_EVENTS = {
  SERVER_CONNECTED: "server:connected",
  PONG: "pong",
  AUDIO_STARTED: "audio:start",
  AUDIO_CHUNKED: "audio:chunked",
  AUDIO_STOPPED: "audio:stopped",
  MENTOR_TRANSCRIPTION: "mentor:transcription",
  AUDIO_OUTPUT_CHUNK: "audio:output:chunk",
  AUDIO_OUTPUT_INTERRUPTED: "audio:output:interrupted",
  AUDIO_OUTPUT_ERROR: "audio:output:error",
  AUDIO_OUTPUT_COMPLETE: "audio:output:complete",
} as const;

export const LUMA_MENTOR_STREAM_EVENT_TYPES = {
  MENTOR_TRANSCRIPTION: "mentor.transcription",
  AUDIO_OUTPUT_CHUNK: "audio.output.chunk",
  AUDIO_OUTPUT_INTERRUPTED: "audio.output.interrupted",
  AUDIO_OUTPUT_ERROR: "audio.output.error",
  AUDIO_OUTPUT_COMPLETE: "audio.output.complete",
} as const;

export const LUMA_SOCKET_EMIT_EVENTS = {
  START_AUDIO: "start_audio",
  AUDIO_CHUNK: "audio_chunk",
  AUDIO_STOP: "audio_stop",
  MENTOR_TEXT_DELTA: "mentor_text_delta",
  MENTOR_TEXT_END: "mentor_text_end",
  MENTOR_TEXT_ERROR: "mentor_text_error",
  PING: "ping",
} as const;

export type AudioBinaryChunk = ArrayBuffer | Uint8Array | Buffer;

export type StartAudioPayload = {
  type: (typeof LUMA_SOCKET_MESSAGE_TYPES)["AUDIO_START"];
  audioAction: (typeof LUMA_AUDIO_ACTIONS)["VOICE_MENTOR"];
  language: string;
  preset?: string;
  customTTSReference?: string;
  meta: {
    sr: number;
    channels: number;
    format: (typeof LUMA_AUDIO_FORMATS)["PCM_S16LE"];
  };
};

export type AudioChunkPayload = {
  type: (typeof LUMA_SOCKET_MESSAGE_TYPES)["AUDIO_CHUNK"];
  meta: {
    seq: number;
    sr: number;
    samples: number;
    tsMs: number;
  };
};

export type AudioStopPayload = {
  type: (typeof LUMA_SOCKET_MESSAGE_TYPES)["AUDIO_STOP"];
};

export type MentorTextDeltaPayload = {
  type: (typeof LUMA_SOCKET_MESSAGE_TYPES)["MENTOR_TEXT_DELTA"];
  jobId: string;
  seq: number;
  text: string;
};

export type MentorTextEndPayload = {
  type: (typeof LUMA_SOCKET_MESSAGE_TYPES)["MENTOR_TEXT_END"];
  jobId: string;
  reason?: string;
};

export type MentorTextErrorPayload = {
  type: (typeof LUMA_SOCKET_MESSAGE_TYPES)["MENTOR_TEXT_ERROR"];
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

export type AudioStartedPayload = {
  [key: string]: unknown;
};

export type MentorStreamEventEnvelope<TType extends string, TData> = {
  type: TType;
  sessionId: string;
  jobId: string;
  tsMs: number;
  data: TData;
};

export type MentorTranscriptionData = {
  text: string;
};

export type AudioOutputChunkData = {
  seq: number;
  codec: string;
  chunkBase64: string;
  sampleRate?: number | null;
};

export type AudioOutputInterruptedData = {
  reason: string;
};

export type AudioOutputErrorData = {
  code: string;
  message: string;
  retryable: boolean;
};

export type AudioOutputCompleteData = {
  totalChunks: number;
};

export type MentorTranscriptionPayload = MentorStreamEventEnvelope<
  (typeof LUMA_MENTOR_STREAM_EVENT_TYPES)["MENTOR_TRANSCRIPTION"],
  MentorTranscriptionData
>;

export type AudioOutputChunkPayload = MentorStreamEventEnvelope<
  (typeof LUMA_MENTOR_STREAM_EVENT_TYPES)["AUDIO_OUTPUT_CHUNK"],
  AudioOutputChunkData
>;

export type AudioOutputInterruptedPayload = MentorStreamEventEnvelope<
  (typeof LUMA_MENTOR_STREAM_EVENT_TYPES)["AUDIO_OUTPUT_INTERRUPTED"],
  AudioOutputInterruptedData
>;

export type AudioOutputErrorPayload = MentorStreamEventEnvelope<
  (typeof LUMA_MENTOR_STREAM_EVENT_TYPES)["AUDIO_OUTPUT_ERROR"],
  AudioOutputErrorData
>;

export type AudioOutputCompletePayload = MentorStreamEventEnvelope<
  (typeof LUMA_MENTOR_STREAM_EVENT_TYPES)["AUDIO_OUTPUT_COMPLETE"],
  AudioOutputCompleteData
>;

export type LumaSocketListenEvents = {
  [LUMA_SOCKET_LISTEN_EVENTS.SERVER_CONNECTED]: (payload: ServerConnectedPayload) => void;
  [LUMA_SOCKET_LISTEN_EVENTS.PONG]: (payload: unknown) => void;
  [LUMA_SOCKET_LISTEN_EVENTS.AUDIO_STARTED]: (payload: AudioStartedPayload) => void;
  [LUMA_SOCKET_LISTEN_EVENTS.AUDIO_CHUNKED]: (payload: unknown) => void;
  [LUMA_SOCKET_LISTEN_EVENTS.AUDIO_STOPPED]: (payload: unknown) => void;
  [LUMA_SOCKET_LISTEN_EVENTS.MENTOR_TRANSCRIPTION]: (payload: MentorTranscriptionPayload) => void;
  [LUMA_SOCKET_LISTEN_EVENTS.AUDIO_OUTPUT_CHUNK]: (payload: AudioOutputChunkPayload) => void;
  [LUMA_SOCKET_LISTEN_EVENTS.AUDIO_OUTPUT_INTERRUPTED]: (payload: AudioOutputInterruptedPayload) => void;
  [LUMA_SOCKET_LISTEN_EVENTS.AUDIO_OUTPUT_ERROR]: (payload: AudioOutputErrorPayload) => void;
  [LUMA_SOCKET_LISTEN_EVENTS.AUDIO_OUTPUT_COMPLETE]: (payload: AudioOutputCompletePayload) => void;
};

export type LumaSocketEmitEvents = {
  [LUMA_SOCKET_EMIT_EVENTS.START_AUDIO]: (payload: StartAudioPayload) => void;
  [LUMA_SOCKET_EMIT_EVENTS.AUDIO_CHUNK]: (payload: AudioChunkPayload, chunk: AudioBinaryChunk) => void;
  [LUMA_SOCKET_EMIT_EVENTS.AUDIO_STOP]: (payload: AudioStopPayload) => void;
  [LUMA_SOCKET_EMIT_EVENTS.MENTOR_TEXT_DELTA]: (payload: MentorTextDeltaPayload) => void;
  [LUMA_SOCKET_EMIT_EVENTS.MENTOR_TEXT_END]: (payload: MentorTextEndPayload) => void;
  [LUMA_SOCKET_EMIT_EVENTS.MENTOR_TEXT_ERROR]: (payload: MentorTextErrorPayload) => void;
  [LUMA_SOCKET_EMIT_EVENTS.PING]: (payload?: unknown) => void;
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

  onServerConnected(handler: LumaSocketListenEvents[typeof LUMA_SOCKET_LISTEN_EVENTS.SERVER_CONNECTED]): this;
  onAudioStarted(handler: LumaSocketListenEvents[typeof LUMA_SOCKET_LISTEN_EVENTS.AUDIO_STARTED]): this;
  onAudioChunked(handler: LumaSocketListenEvents[typeof LUMA_SOCKET_LISTEN_EVENTS.AUDIO_CHUNKED]): this;
  onAudioStopped(handler: LumaSocketListenEvents[typeof LUMA_SOCKET_LISTEN_EVENTS.AUDIO_STOPPED]): this;
  onMentorTranscription(handler: LumaSocketListenEvents[typeof LUMA_SOCKET_LISTEN_EVENTS.MENTOR_TRANSCRIPTION]): this;
  onAudioOutputChunk(handler: LumaSocketListenEvents[typeof LUMA_SOCKET_LISTEN_EVENTS.AUDIO_OUTPUT_CHUNK]): this;
  onAudioOutputInterrupted(handler: LumaSocketListenEvents[typeof LUMA_SOCKET_LISTEN_EVENTS.AUDIO_OUTPUT_INTERRUPTED]): this;
  onAudioOutputError(handler: LumaSocketListenEvents[typeof LUMA_SOCKET_LISTEN_EVENTS.AUDIO_OUTPUT_ERROR]): this;
  onAudioOutputComplete(handler: LumaSocketListenEvents[typeof LUMA_SOCKET_LISTEN_EVENTS.AUDIO_OUTPUT_COMPLETE]): this;
}
