import { io } from "socket.io-client";
import {
  AudioChunkPayload,
  AudioStopPayload,
  AudioBinaryChunk,
  LumaSocket,
  LumaSocketListenEvents,
  MentorTextDeltaPayload,
  MentorTextEndPayload,
  MentorTextErrorPayload,
  StartAudioPayload,
} from "./types";

export type LumaSocketClientOptions = {
  baseURL?: string;
  apiKey?: string;
  allowInsecureTls?: boolean;
  socketData?: {
    sessionId?: string;
    userId?: string;
    lessonId?: string;
  };
};

export const createLumaSocket = (opts: LumaSocketClientOptions): LumaSocket => {
  const socket = io(opts.baseURL, {
    transports: ["websocket", "polling"],
    autoConnect: false,
    secure: true,
    rejectUnauthorized: !opts.allowInsecureTls,
    auth: {
      apiKey: opts.apiKey,
      sessionId: opts.socketData?.sessionId,
      currentSocketUser: {
        userId: opts.socketData?.userId,
        lessonId: opts.socketData?.lessonId,
      },
    },
    path: "/api/ws/socket.io",
  }) as LumaSocket;

  socket.startAudio = (payload: StartAudioPayload) => {
    socket.emit("start_audio", payload);
    return socket;
  };

  socket.sendAudioChunk = (payload: AudioChunkPayload, chunk: AudioBinaryChunk) => {
    socket.emit("audio_chunk", payload, chunk);
    return socket;
  };

  socket.stopAudio = (payload?: AudioStopPayload) => {
    socket.emit("audio_stop", payload ?? { type: "audio.stop" });
    return socket;
  };

  socket.sendMentorTextDelta = (payload: MentorTextDeltaPayload) => {
    socket.emit("mentor_text_delta", payload);
    return socket;
  };

  socket.sendMentorTextEnd = (payload: MentorTextEndPayload) => {
    socket.emit("mentor_text_end", payload);
    return socket;
  };

  socket.sendMentorTextError = (payload: MentorTextErrorPayload) => {
    socket.emit("mentor_text_error", payload);
    return socket;
  };

  socket.sendPing = (payload?: unknown) => {
    socket.emit("ping", payload);
    return socket;
  };

  socket.onServerConnected = (handler: LumaSocketListenEvents["server:connected"]) => {
    socket.on("server:connected", handler);
    return socket;
  };

  socket.onAudioStarted = (handler: LumaSocketListenEvents["audio:started"]) => {
    socket.on("audio:started", handler);
    return socket;
  };

  socket.onAudioChunked = (handler: LumaSocketListenEvents["audio:chunked"]) => {
    socket.on("audio:chunked", handler);
    return socket;
  };

  socket.onAudioStopped = (handler: LumaSocketListenEvents["audio:stopped"]) => {
    socket.on("audio:stopped", handler);
    return socket;
  };

  socket.onMentorTranscription = (handler: LumaSocketListenEvents["mentor:transcription"]) => {
    socket.on("mentor:transcription", handler);
    return socket;
  };

  socket.onAudioOutputChunk = (handler: LumaSocketListenEvents["audio:output:chunk"]) => {
    socket.on("audio:output:chunk", handler);
    return socket;
  };

  socket.onAudioOutputInterrupted = (
    handler: LumaSocketListenEvents["audio:output:interrupted"],
  ) => {
    socket.on("audio:output:interrupted", handler);
    return socket;
  };

  socket.onAudioOutputError = (handler: LumaSocketListenEvents["audio:output:error"]) => {
    socket.on("audio:output:error", handler);
    return socket;
  };

  socket.onAudioOutputComplete = (handler: LumaSocketListenEvents["audio:output:complete"]) => {
    socket.on("audio:output:complete", handler);
    return socket;
  };

  return socket;
};
